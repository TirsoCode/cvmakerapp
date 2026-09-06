#!/usr/bin/env node
// Genera un Reel de CVMakerApp con la API de KIE (Veo 3.1 / Sora / Kling...).
// Uso:
//   KIE_API_KEY=... node scripts/generate-kie-video.mjs [--model veo3_fast] [--out videos/inbox/x.mp4]
// Flujo: crea 5 tareas de video (async) -> poll -> descarga clips -> une con ffmpeg -> textos ES -> videos/inbox/
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const API_KEY = process.env.KIE_API_KEY;
if (!API_KEY) {
  console.error("Falta KIE_API_KEY (https://kie.ai/api-key)");
  process.exit(1);
}
const args = process.argv.slice(2);
const MODEL = args.includes("--model") ? args[args.indexOf("--model") + 1] : "veo3_lite";

const API = "https://api.kie.ai/api/v1";
const SCENES = [
  {
    prompt:
      "Close-up of a smartphone on a modern desk showing a boring black-and-white CV document, dark moody workspace, dramatic lighting, cinematic shallow depth of field, professional look, no people, no readable text",
    text: "¿Tu CV aburre a los reclutadores?",
    tone: "#18181B",
  },
  {
    prompt:
      "A stressed young professional staring at an empty document on a laptop at night in a dim home office, tired expression, warm lamp light, realistic cinematic mood, subtle camera movement, no text on screen",
    text: "Horas en Word. Resultados mediocres.",
    tone: "#18181B",
  },
  {
    prompt:
      "A young professional smiling while looking at a modern colorful resume with red accent cards and progress bars on a bright clean desk, optimistic mood, natural daylight, smooth slow zoom, premium commercial style, no text on screen",
    text: "Con CVMakerApp lo mejoras en minutos.",
    tone: "#18181B",
  },
  {
    prompt:
      "Vertical timelapse of a white A4 resume page filling itself with text, colored section headers and skill progress bars in corporate red on clean light background, elegant minimal design, bright studio lighting, smooth motion, no text on screen",
    text: "20 plantillas premium · PDF · Markdown",
    tone: "#18181B",
  },
  {
    prompt:
      "Dark baroque background with deep red gradient, a large white rounded call-to-action button in the center with a downward arrow icon, golden confetti particles falling, premium product commercial, cinematic lighting, no text on screen",
    text: "Crea tu CV gratis → cvmakerapp.vercel.app",
    tone: "#1A1918",
  },
];

async function create(prompt) {
  const r = await fetch(`${API}/veo/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({
      prompt,
      model: MODEL,
      aspect_ratio: "9:16",
      resolution: "720p",
      generationType: "TEXT_2_VIDEO",
    }),
  });
  const j = await r.json();
  if (!r.ok || !j.data?.taskId) {
    console.error("Error creando tarea:", JSON.stringify(j).slice(0, 400));
    process.exit(1);
  }
  return j.data.taskId;
}

async function poll(taskId) {
  const url = `${API}/veo/record-info?taskId=${taskId}`;
  for (let i = 0; i < 60; i++) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${API_KEY}` } });
    const j = await r.json();
    const d = j.data;
    if (d && d.successFlag === 1 && d.resultUrls) {
      let urls = d.resultUrls;
      if (typeof urls === "string") urls = JSON.parse(urls);
      return Array.isArray(urls) ? urls[0] : urls;
    }
    if (d && (d.successFlag === 2 || d.successFlag === 3)) {
      throw new Error(`Tarea ${taskId} falló: ${j.msg}`);
    }
    await new Promise((res) => setTimeout(res, 15000));
  }
  throw new Error(`Timeout esperando a ${taskId}`);
}

function esc(s) {
  return s.replace(/'/g, "’").replace(/:/g, "\\:");
}

(async () => {
  console.log("Creando 5 tareas de video con modelo:", MODEL);
  const tasks = [];
  for (const s of SCENES) {
    const id = await create(s.prompt);
    tasks.push({ id, scene: s });
    console.log("→", id);
    await new Promise((res) => setTimeout(res, 2000));
  }

  const tmp = join(ROOT, ".reel-tmp");
  mkdirSync(tmp, { recursive: true });
  const raw = [];
  try {
    for (let i = 0; i < tasks.length; i++) {
      console.log(`Esperando escena ${i + 1}/${tasks.length}...`);
      const url = await poll(tasks[i].id);
      const clip = join(tmp, `scene-${i}.mp4`);
      execFileSync("curl", ["-sL", "-o", clip, url], { stdio: "ignore" });
      raw.push(clip);
    }
    console.log("Escenas descargadas → uniendo con textos...");

    const total = raw.length;
    const per = 8;
    const dur = total * per;
    const inputs = [];
    raw.forEach((c) => inputs.push("-i", c));
    const textRef = [
      "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
      "/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
    ].find((f) => existsSync(f)) || "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf";

    let fc = raw
      .map((_, i) =>
        `[${i}:v]scale=${1080}:${1920}:force_original_aspect_ratio=decrease,pad=${1080}:${1920}:(ow-iw)/2:(oh-ih)/2:color=black,fps=30,format=yuv420p,` +
        `drawtext=text='${esc(tasks[i].scene.text)}':fontfile='${textRef}':fontsize=54:fontcolor=white:box=1:boxcolor=black@0.65:boxborderw=34:x=(w-text_w)/2:y=h*0.72:enable='between(t,0,${per - 0.3})'` +
        `[v${i}]`
      )
      .join(";");
    fc += `;[v0][v1][v2][v3][v4]concat=n=${total}:v=1:a=0[outv]`;
    const audio = `aevalsrc=0.06*sin(2*PI*110*t)+0.04*sin(2*PI*138.6*t):s=44100:d=${dur},afade=t=in:d=1,afade=t=out:st=${dur - 1.5}:d=1.5,aformat=sample_fmts=fltp:channel_layouts=stereo`;
    const outName = args.includes("--out")
      ? args[args.indexOf("--out") + 1]
      : `cvmakerapp-reel-${new Date().toISOString().slice(0, 10)}.mp4`;
    const outPath = join(ROOT, "videos", "inbox", outName.replace(/[/\\]/g, ""));
    writeFileSync(
      outPath + ".txt",
      `title=CVMakerApp · Crea tu CV profesional en minutos

description=Crea tu currículum en minutos con CVMakerApp.

20 plantillas premium · Exporta a PDF y Markdown · Sin registro.

👉 https://cvmakerapp.vercel.app

#CV #Curriculo #Empleo #Trabajo

tags=CV,Curriculo,Plantillas,Empleo,Trabajo
privacy=private
`
    );
    execFileSync("ffmpeg", [
      "-y", ...inputs, "-f", "lavfi", "-i", audio,
      "-filter_complex", fc,
      "-map", "[outv]", "-map", `${total}:a`,
      "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", "-shortest", outPath,
    ], { stdio: "inherit" });
    console.log("OK:", outPath);
    console.log("Revisa el video y, si está bien, cambia privacy=public en el .txt o déjalo private.");
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
})();