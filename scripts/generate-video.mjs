#!/usr/bin/env node
// Genera un Reel vertical (1080x1920) con las plantillas reales de CVMakerApp.
// Uso: node scripts/generate-video.mjs [--week N] [--out videos/x.mp4]
// Requiere ffmpeg en el PATH. Sin dependencias de terceros.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const args = process.argv.slice(2);
const weekIdx = args.includes("--week")
  ? parseInt(args[args.indexOf("--week") + 1] || "0", 10)
  : isoWeek(new Date());
const outArg = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;

const W = 1080;
const H = 1920;
const FPS = 30;
const SLIDE_SECONDS = 4;
const FRAMES = SLIDE_SECONDS * FPS;
const FONT = findFont();

const TEMPLATES = parseTemplates();
function parseTemplates() {
  const src = existsSync(join(ROOT, "lib/types.ts")) ? join(ROOT, "lib/types.ts") : null;
  if (!src) throw new Error("No existe lib/types.ts");
  const txt = readFileSync(src, "utf8");
  const re = /id:\s*"([a-z0-9-]+)",\s*name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*accent:\s*"([^"]+)",\s*bg:\s*"([^"]+)"/g;
  const t = [];
  let m;
  while ((m = re.exec(txt))) t.push({ id: m[1], name: m[2], description: m[3], accent: m[4], bg: m[5] });
  if (t.length < 10) throw new Error("No se pudieron parsear las plantillas de lib/types.ts");
  return t;
}

function slidesForWeek(week) {
  const start = (week * 4) % TEMPLATES.length;
  const picked = [];
  for (let i = 0; i < 4; i++) picked.push(TEMPLATES[(start + i) % TEMPLATES.length]);
  return picked;
}

function findFont() {
  const candidates = [
    ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"],
    ["/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans-Bold.ttf", "/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans.ttf"],
  ];
  for (const [bold, reg] of candidates) if (existsSync(bold) && existsSync(reg)) return { bold, reg };
  throw new Error("No se encontró DejaVuSans");
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "’").replace(/:/g, "\\:");
}
function hexToFfmpeg(hex) {
  const h = hex.replace("#", "");
  return "0x" + h.toUpperCase();
}
function shade(hex, f) {
  const h = hex.replace("#", "");
  const c = (p) => Math.floor(parseInt(h.slice(p, p + 2), 16) * f);
  return "#" + [c(0), c(2), c(4)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
function dt(text, size, color, x, y, bold) {
  return `drawtext=text='${esc(text)}':fontfile='${FONT}':fontsize=${size}:fontcolor=${hexToFfmpeg(color)}:x=${x}:y=${y}` + (bold ? "" : `:fontfile2='${FONT.replace("Bold", "")}'`);
}

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// ---------- Construcción de slides ----------
const slides = [];
slides.push({
  gradient: ["#C0392B", "#7F1D1D"],
  text: [
    { t: "CVMakerApp", s: 96, c: "#FFFFFF", y: "h*0.4", bold: true },
    { t: "CV profesionales en minutos", s: 32, c: "#FFD9D1", y: "h*0.52", bold: false },
  ],
});
slidesForWeek(weekIdx).forEach((tpl, i) => {
  const bg = tpl.bg;
  slides.push({
    gradient: [shade(bg, 0.97), shade(bg, 0.86)],
    text: [
      { t: tpl.name, s: 90, c: tpl.accent, y: "h*0.34", bold: true },
      { t: tpl.description, s: 42, c: shade(tpl.accent, 0.9), y: "h*0.46", bold: false },
      { t: "cvmakerapp.vercel.app", s: 30, c: shade(tpl.accent, 0.75), y: "h*0.9", bold: false },
    ],
  });
});
slides.push({
  gradient: ["#1A1918", "#000000"],
  text: [
    { t: "Crea tu CV gratis", s: 84, c: "#FFFFFF", y: "h*0.42", bold: true },
    { t: "cvmakerapp.vercel.app", s: 42, c: "#FFB3A7", y: "h*0.55", bold: false },
  ],
});

// ---------- Render ----------
const tmp = join(ROOT, ".reel-tmp");
mkdirSync(tmp, { recursive: true });
const clips = [];
try {
  slides.forEach((s, i) => {
    const png = join(tmp, `slide-${i}.png`);
    const vf = s.text.map((l) =>
      l.bold
        ? `drawtext=text='${esc(l.t)}':fontfile='${FONT.bold}':fontsize=${l.s}:fontcolor=${hexToFfmpeg(l.c)}:x=(w-text_w)/2:y=${l.y}`
        : `drawtext=text='${esc(l.t)}':fontfile='${FONT.reg}':fontsize=${l.s}:fontcolor=${hexToFfmpeg(l.c)}:x=(w-text_w)/2:y=${l.y}`
    ).join(",");
    execFileSync("ffmpeg", ["-y", "-f", "lavfi", "-i",
      `gradients=s=${W}x${H}:c0=${hexToFfmpeg(s.gradient[0])}:c1=${hexToFfmpeg(s.gradient[1])}`,
      "-vf", vf, "-frames:v", "1", png], { stdio: "ignore" });

    const clip = join(tmp, `clip-${i}.mp4`);
    execFileSync("ffmpeg", ["-y", "-i", png,
      "-vf", `scale=${W * 2}:${H * 2},zoompan=z='min(zoom+0.0012,1.18)':d=${FRAMES}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS},format=yuv420p`,
      "-t", String(SLIDE_SECONDS), "-r", String(FPS), "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", clip], { stdio: "ignore" });
    clips.push(clip);
  });

  if (clips.length === 0) throw new Error("Sin clips");
  let cmd = ["-y"];
  clips.forEach((c) => cmd.push("-i", c));
  const total = clips.length * SLIDE_SECONDS - (clips.length - 1) * 0.5;
  let fc = clips.map((_, i) => `[${i}:v]settb=AVTB,fps=${FPS},format=yuv420p[v${i}]`).join(";");
  let prev = "[v0]";
  let offset = SLIDE_SECONDS - 0.5;
  for (let i = 1; i < clips.length; i++) {
    const name = i === clips.length - 1 ? "vout" : `x${i}`;
    fc += `;${prev}[v${i}]xfade=transition=fade:duration=0.5:offset=${offset.toFixed(2)}[${name}]`;
    prev = `[${name}]`;
    offset += SLIDE_SECONDS - 0.5;
  }
  const audio = `aevalsrc=0.08*sin(2*PI*220*t)+0.05*sin(2*PI*277*t)+0.04*sin(2*PI*330*t):s=44100:d=${total.toFixed(2)},afade=t=in:d=1.5,afade=t=out:st=${(total - 1.5).toFixed(2)}:d=1.5,aformat=sample_fmts=fltp:channel_layouts=stereo`;
  cmd.push("-f", "lavfi", "-i", audio, "-filter_complex", fc, "-map", "[vout]", "-map", `${clips.length}:a`, "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", "-shortest");
  const outPath = outArg || join(ROOT, "videos", `cvmakerapp-reel-${String(weekIdx).padStart(2, "0")}.mp4`);
  mkdirSync(join(outPath, ".."), { recursive: true });
  cmd.push(outPath);
  execFileSync("ffmpeg", cmd, { stdio: "inherit" });
  console.log("OK:", outPath);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}