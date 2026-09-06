#!/usr/bin/env node
// Sube a YouTube todos los videos de videos/inbox/*.mp4 usando la YouTube Data API v3.
// Uso:
//   YT_CLIENT_ID=... YT_CLIENT_SECRET=... YT_REFRESH_TOKEN=... node scripts/upload-youtube.mjs
// Opcional por video: un fichero de metadatos .txt con el mismo nombre (videos/inbox/video.mp4.txt):
//   title=CVMakerApp · CV en minutos
//   description=...
//   tags=curriculum,cv,plantillas
//   privacy=public|unlisted|private
// Al subirse, el video pasa de videos/inbox/ a videos/uploaded/.
import { readdirSync, readFileSync, existsSync, renameSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const INBOX = join(ROOT, "videos", "inbox");
const UPLOADED = join(ROOT, "videos", "uploaded");

const CLIENT_ID = process.env.YT_CLIENT_ID;
const CLIENT_SECRET = process.env.YT_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.YT_REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  if (process.env.CI) {
    console.error("Faltan credenciales YT (YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN). Ejecuta en local o configura los secretos en GitHub → Settings → Secrets and variables → Actions.");
    process.exit(0);
  }
  console.error("Faltan credenciales: YT_CLIENT_ID, YT_CLIENT_SECRET y YT_REFRESH_TOKEN");
  process.exit(1);
}

async function getAccessToken() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!r.ok) {
    console.error("Error en token:", j.error_description || j.error || j);
    process.exit(1);
  }
  return j.access_token;
}

function parseMeta(txtPath) {
  const meta = { title: null, description: null, tags: [], privacy: null };
  if (!existsSync(txtPath)) return meta;
  for (const raw of readFileSync(txtPath, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const idx = line.indexOf("=");
    if (idx < 1) continue;
    const k = line.slice(0, idx).trim().toLowerCase();
    const v = line.slice(idx + 1).trim();
    if (k === "title") meta.title = v;
    else if (k === "description") meta.description = v;
    else if (k === "privacy") meta.privacy = v;
    else if (k === "tags") meta.tags = v.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return meta;
}

async function uploadVideo(accessToken, filePath, meta) {
  const dateStr = new Date().toISOString().slice(0, 10);
  const snippet = {
    title: meta.title || `CVMakerApp · Nuevo CV profesional (${dateStr})`,
    description:
      meta.description ||
      "Crea tu currículum profesional en minutos.\n\n20 plantillas premium · Exporta a PDF y Markdown · Sin registro.\n\n👉 https://cvmakerapp.vercel.app\n\n#CV #Curriculum #Empleo #Trabajo",
    tags: meta.tags.length ? meta.tags : ["CV", "Curriculo", "Plantillas", "Empleo", "Trabajo"],
    categoryId: "25",
  };
  const status = { privacyStatus: meta.privacy || process.env.YT_DEFAULT_PRIVACY || "private" };
  const body = JSON.stringify({ snippet, status });
  const size = statSync(filePath).size;

  const init = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Length": String(size),
        "X-Upload-Content-Type": "video/mp4",
      },
      body,
    }
  );
  if (init.status !== 200) {
    const t = await init.text();
    throw new Error(`No se pudo iniciar la subida (${init.status}): ${t.slice(0, 500)}`);
  }
  const uploadUrl = init.headers.get("location");

  const buf = readFileSync(filePath);
  const up = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4", "Content-Length": String(size) },
    body: buf,
  });
  if (up.status !== 200 && up.status !== 201) {
    const t = await up.text();
    throw new Error(`Subida fallida (${up.status}): ${t.slice(0, 500)}`);
  }
  const res = await up.json();
  return res.id;
}

async function main() {
  if (!existsSync(INBOX)) {
    console.log("No hay videos/inbox. Cero videos.");
    return;
  }
  const files = readdirSync(INBOX)
    .filter((f) => f.endsWith(".mp4") && !f.startsWith("."))
    .sort();
  if (!files.length) {
    console.log("videos/inbox vacío. Nada que subir.");
    return;
  }
  mkdirSync(UPLOADED, { recursive: true });
  const accessToken = await getAccessToken();
  const resultados = [];
  for (const f of files) {
    const filePath = join(INBOX, f);
    const meta = parseMeta(filePath + ".txt");
    try {
      const id = await uploadVideo(accessToken, filePath, meta);
      renameSync(filePath, join(UPLOADED, f));
      if (existsSync(filePath + ".txt")) renameSync(filePath + ".txt", join(UPLOADED, f + ".txt"));
      resultados.push(`https://youtu.be/${id}`);
    } catch (e) {
      console.error(`[ERROR] ${f}:`, e.message);
    }
  }
  if (resultados.length) console.log("Subidos:\n" + resultados.join("\n"));
}

main();