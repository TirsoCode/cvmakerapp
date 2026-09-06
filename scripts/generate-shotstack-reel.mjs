import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";

const API_BASE = "https://api.shotstack.io/edit/stage/render";
let API_KEY = process.env.SHOTSTACK_API_KEY;
if (!API_KEY && existsSync(".env.local")) {
  const env = await readFile(".env.local", "utf8");
  const m = env.match(/^SHOTSTACK_API_KEY=(.+)$/m);
  API_KEY = m?.[1]?.trim();
}
if (!API_KEY) {
  console.error("Falta SHOTSTACK_API_KEY (variable de entorno o .env.local)");
  process.exit(1);
}

const C = {
  bg: "#0B0F1A",
  bg2: "#131B2E",
  gold: "#F5C453",
  blue: "#7C8CF8",
  white: "#FFFFFF",
  muted: "#93A1C4",
  dark: "#05070D",
};

const FONT = "'Inter','Helvetica Neue',Arial,sans-serif";

function scene(html, secs, start) {
  return {
    asset: {
      type: "html",
      html: `<div style="position:relative;width:720px;height:1280px;background:linear-gradient(160deg,${C.bg} 0%,${C.bg2} 55%,${C.dark} 100%);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px;box-sizing:border-box;overflow:hidden;">${html}</div>`,
      width: 720,
      height: 1280,
    },
    start,
    length: secs,
    transition: {
      in: "fade",
      out: "fade",
    },
  };
}

function mini(text, margin = 0) {
  return `<div style="font-family:${FONT};font-size:30px;font-weight:600;color:${C.gold};letter-spacing:5px;text-transform:uppercase;margin-bottom:${margin}px;">${text}</div>`;
}
function big(text, color = C.white, size = 84) {
  return `<div style="font-family:${FONT};font-size:${size}px;font-weight:800;color:${color};line-height:1.15;letter-spacing:-2px;margin:18px 0;">${text}</div>`;
}
function sub(text) {
  return `<div style="font-family:${FONT};font-size:36px;line-height:1.5;color:${C.muted};max-width:560px;">${text}</div>`;
}
function accentBar() {
  return `<div style="width:96px;height:10px;border-radius:999px;background:linear-gradient(90deg,${C.gold},${C.blue});margin:34px 0;"></div>`;
}

const s5 = 2.6;

const scenes = [
  scene(`${mini("CVMakerApp")}${big("Tu CV no está<br/>listo para 2026", C.white, 92)}${accentBar()}${sub("Diseños que se descartan en segundos")}`, s5, 0),
  scene(`${mini("El problema")}${big("El 90% de los CVs<br/>acaban en la papelera", C.white, 80)}${accentBar()}${sub("Plantillas genéricas, cero impacto")}`, s5, s5),
  scene(`${mini("La solución")}${big("Crea un CV que<br/>venda tu talento", C.gold, 84)}${accentBar()}${sub("En menos de 2 minutos, desde tu móvil")}`, s5, s5 * 2),
  scene(`${mini("Lo que obtienes")}${big("20 plantillas<br/>premium y gratis", C.white, 84)}${accentBar()}${sub("Exporta a PDF · Datos en nube · Sin registro complicado")}`, s5, s5 * 3),
  scene(`${mini("Empieza hoy")}${big("Crea tu CV gratis", C.white, 92)}${accentBar()}${sub(`👉 <span style="color:${C.blue};font-weight:700;">cvmakerapp.vercel.app</span>`)}`, s5, s5 * 4),
];

let t = 0;
scenes.forEach((sc) => {
  sc.start = t;
  t += sc.length;
});
const total = t;

const edit = {
  timeline: {
    background: C.dark,
    tracks: [
      {
        clips: scenes,
      },
    ],
  },
  output: {
    format: "mp4",
    resolution: "1080",
    aspectRatio: "9:16",
  },
};

async function createRender() {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify(edit),
  });
  const json = await res.json();
  if (!res.ok && !json.response?.id) throw new Error(`Crear render: ${JSON.stringify(json)}`);
  return json.response.id;
}

async function waitRender(id) {
  for (let i = 0; i < 90; i++) {
    const res = await fetch(`${API_BASE}/${id}`, { headers: { "x-api-key": API_KEY } });
    const json = await res.json();
    const r = json.response ?? {};
    const status = r.status;
    console.log(`→ estado: ${status}${r.error ? ` | error: ${r.error}` : ""}`);
    if (status === "done") return r.url;
    if (status === "failed") throw new Error(`Render falló: ${r.error}`);
    await delay(5000);
  }
  throw new Error("Timeout esperando el render");
}

const id = await createRender();
console.log(`Render encolado: ${id}`);
const url = await waitRender(id);
console.log(`Video listo: ${url}`);

const filename = `cvmakerapp-reel-shotstack-${new Date().toISOString().slice(0, 10)}.mp4`;
const outPath = `videos/inbox/${filename}`;
const dl = await fetch(url);
if (!dl.ok) throw new Error(`Download falló: ${dl.status}`);
const buf = Buffer.from(await dl.arrayBuffer());
const { writeFile, mkdir } = await import("node:fs/promises");
await mkdir("videos/inbox", { recursive: true });
await writeFile(outPath, buf);
console.log(`Guardado: ${outPath} (${(buf.length / 1024 / 1024).toFixed(1)} MB)`);

const { execSync } = await import("node:child_process");
const tmpWav = ".reel-tmp-audio.wav";
execSync(
  `ffmpeg -y -f lavfi -i "sine=frequency=220:duration=${total}" -f lavfi -i "sine=frequency=330:duration=${total}" -filter_complex "[0:a][1:a]amix=inputs=2:weights=0.35 0.2,afade=t=out:st=${total - 1}:d=1,volume=0.35[a]" -map "[a]" -ar 44100 -ac 2 "${tmpWav}"`,
  { stdio: "ignore" }
);
const scored = outPath.replace(".mp4", "-con-audio.mp4");
execSync(
  `ffmpeg -y -i "${outPath}" -i "${tmpWav}" -filter_complex "[1:a]afade=t=in:d=0.5,afade=t=out:st=${total - 1}:d=1[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -shortest "${scored}"`,
  { stdio: "ignore" }
);
execSync(`rm -f "${tmpWav}" "${outPath}"`, { stdio: "ignore" });
console.log(`Con audio: ${scored}`);

const meta = `title=CVMakerApp — Crea tu CV en minutos (gratis)
description=Crea un CV profesional en menos de 2 minutos con CVMakerApp. 20 plantillas premium, diseño moderno y exportación a PDF desde tu móvil. Empieza gratis en cvmakerapp.vercel.app
tags=cv, curriculum, empleo, trabajo, plantillas cv, crear cv, cvmakerapp, buscar trabajo
privacy=private
`;
await writeFile(`${scored}.txt`, meta);
console.log("Metadatos listos (.txt). El workflow de YouTube lo subirá cuando le des los secretos.");