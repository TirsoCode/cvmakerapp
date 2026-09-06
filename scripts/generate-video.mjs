#!/usr/bin/env node
// Genera un Reel vertical (1080x1920) con mockups A4 de CV reales de CVMakerApp.
// Uso: node scripts/generate-video.mjs [--week N] [--out videos/x.mp4]
// Requiere ffmpeg en el PATH y fuentes DejaVu. Sin dependencias de terceros.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, existsSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const args = process.argv.slice(2);
const weekIdx = args.includes("--week") ? parseInt(args[args.indexOf("--week") + 1] || "0", 10) : isoWeek(new Date());
const outArg = args.includes("--out") ? args[args.indexOf("--out") + 1] : null;

const W = 1080;
const H = 1920;
const FPS = 30;
const SLIDE_SECONDS = 4;
const FRAMES = SLIDE_SECONDS * FPS;

const FONT = findFont("DejaVuSans.ttf");
const FONT_BOLD = findFont("DejaVuSans-Bold.ttf");

const TEMPLATES = parseTemplates();
function parseTemplates() {
  const src = join(ROOT, "lib/types.ts");
  if (!existsSync(src)) throw new Error("No existe lib/types.ts");
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

function findFont(name) {
  const candidates = [
    `/usr/share/fonts/truetype/dejavu/${name}`,
    `/data/data/com.termux/files/usr/share/fonts/TTF/${name}`,
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  throw new Error(`No se encontró la fuente ${name}`);
}

function hexToFfmpeg(hex) {
  return "0x" + hex.replace("#", "").toUpperCase();
}
function shade(hex, f) {
  const h = hex.replace("#", "");
  const c = (p) => Math.floor(parseInt(h.slice(p, p + 2), 16) * f);
  return "#" + [c(0), c(2), c(4)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
function mix(a, b, f) {
  const h = (s, i) => parseInt(s.replace("#", "").slice(i, i + 2), 16);
  const c = (p) => Math.round(h(a, p) * (1 - f) + h(b, p) * f);
  return "#" + [c(0), c(2), c(4)].map((v) => v.toString(16).padStart(2, "0")).join("");
}
function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// ---------- Dibujo ----------
// Un "slide" es: fondo + lista de capas {box} o {text}.
function box(t, x, y, w, h) {
  return `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${hexToFfmpeg(t)}:t=fill`;
}
function txt(t, size, color, x, y, font = FONT, extra = "") {
  return `drawtext=text='${esc(t)}':fontfile='${font}':fontsize=${size}:fontcolor=${hexToFfmpeg(color)}:x=${x}:y=${y}${extra}`;
}
function ctxt(t, size, color, y, font = FONT, extra = "") {
  return txt(t, size, color, `(w-text_w)/2`, y, font, extra);
}
function rtxt(t, size, color, y, font = FONT, extra = "") {
  return txt(t, size, color, `w-text_w-140`, y, font, extra);
}
function esc(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/'/g, "’").replace(/:/g, "\\:");
}

function renderSlide(slide, tmp, i) {
  const png = join(tmp, `slide-${i}.png`);
  const layers = [box(slide.bg, 0, 0, W, H)];
  for (const l of slide.layers || []) {
    if (l.box) layers.push(box(l.box, l.x, l.y, l.w, l.h));
    else layers.push(txt(l.t, l.size, l.color, l.x, l.y, l.font || FONT, l.extra || ""));
  }
  execFileSync("ffmpeg", ["-y", "-f", "lavfi", "-i", `color=c=black:s=${W}x${H}`, "-vf", layers.join(","), "-frames:v", "1", png], { stdio: "ignore" });
  const clip = join(tmp, `clip-${i}.mp4`);
  execFileSync("ffmpeg", ["-y", "-i", png,
    "-vf", `scale=${W * 2}:${H * 2},zoompan=z='min(zoom+0.0012,1.18)':d=${FRAMES}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS},format=yuv420p`,
    "-t", String(SLIDE_SECONDS), "-r", String(FPS), "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", clip], { stdio: "ignore" });
  return clip;
}

// ---------- Slides ----------
function introSlide() {
  return {
    bg: "#18181B",
    layers: [
      { txt: "CVMakerApp", size: 96, color: "#FFFFFF", x: "(w-text_w)/2", y: "h*0.28", font: FONT_BOLD },
      { txt: "CV profesionales en minutos", size: 36, color: "#A8A29E", x: "(w-text_w)/2", y: "h*0.37" },
      { box: "#C0392B", x: 0, y: "h*0.44", w: 1080, h: 6 },
      { txt: "20 plantillas premium de CV", size: 36, color: "#FFFFFF", x: "(w-text_w)/2", y: "h*0.50" },
      { txt: "Exporta a PDF y a Markdown", size: 32, color: "#D6D3D1", x: "(w-text_w)/2", y: "h*0.58" },
      { txt: "Sin registro · Rápido · Gratis", size: 32, color: "#D6D3D1", x: "(w-text_w)/2", y: "h*0.64" },
      { box: "#FFFFFF", x: "(w-560)/2", y: "h*0.74", w: 560, h: 90 },
      { txt: "Empezar ahora →", size: 38, color: "#18181B", x: "(w-text_w)/2", y: "h*0.74+21", font: FONT_BOLD },
      { txt: "cvmakerapp.vercel.app", size: 28, color: "#78716C", x: "(w-text_w)/2", y: "h*0.9", font: FONT_BOLD },
    ],
  };
}

// Mockup A4 con la paleta de la plantilla
function templateSlide(tpl, idx) {
  const ink = "#1C1917";
  const gray = "#78716C";
  const soft = "#57534E";
  const accent = tpl.accent;
  const pageW = 740;
  const pageH = 960;
  const px = (W - pageW) / 2; // 170
  const py = 330; // parte superior del A4
  const pad = 56; // margen interior
  const chip_y = 240;
  const url_y = py + pageH + 80;
  const B = (dy, t, thick = 1) => box(accent, px + pad + (t || "d" === "d" ? 0 : 0), py + dy, 3, thick);
  const COL = px + pad;
  const TOP = py + pad;
  return {
    bg: tpl.bg,
    layers: [
      // chip superior: planta
      { box: mix(tpl.bg, "#000000", 0.08), x: (W - 260) / 2 - 20, y: chip_y - 34, w: 300, h: 56 },
      { txt: tpl.name.toUpperCase(), size: 24, color: accent, x: "(w-text_w)/2", y: chip_y - 26, font: FONT_BOLD },
      // sombra A4
      { box: "#00000022", x: px + 10, y: py + 18, w: pageW, h: pageH },
      // pagina
      { box: "#FFFFFF", x: px, y: py, w: pageW, h: pageH },
      // franja superior de color
      { box: accent, x: px, y: py, w: pageW, h: 14 },
      // nombre
      { txt: "MARÍA GARCÍA", size: 40, color: ink, x: COL, y: TOP + 46, font: FONT_BOLD },
      // cargo
      { txt: "Diseñadora de Producto", size: 24, color: accent, x: COL, y: TOP + 92 },
      // contacto
      { txt: "maria@email.com  ·  603 123 456  ·  Madrid", size: 18, color: gray, x: COL, y: TOP + 128 },
      { box: mix(tpl.bg, "#000000", 0.15), x: COL, y: TOP + 170, w: pageW - pad * 2, h: 2 },
      // EXPERIENCIA
      { txt: "EXPERIENCIA", size: 20, color: accent, x: COL, y: TOP + 196, font: FONT_BOLD },
      { txt: "Senior Product Designer", size: 20, color: ink, x: COL, y: TOP + 228, font: FONT_BOLD },
      { txt: "N26 · 2021 — actualidad", size: 17, color: soft, x: COL, y: TOP + 254 },
      { txt: "Diseño del sistema de diseño y la app móvil.", size: 17, color: soft, x: COL, y: TOP + 280 },
      { txt: "Product Designer", size: 20, color: ink, x: COL, y: TOP + 320, font: FONT_BOLD },
      { txt: "Glovo · 2019 — 2021", size: 17, color: soft, x: COL, y: TOP + 346 },
      // EDUCACIÓN
      { txt: "EDUCACIÓN", size: 20, color: accent, x: COL, y: TOP + 396, font: FONT_BOLD },
      { txt: "Máster en Diseño de Producto", size: 19, color: ink, x: COL, y: TOP + 428, font: FONT_BOLD },
      { txt: "IED Barcelona · 2017 — 2019", size: 17, color: soft, x: COL, y: TOP + 454 },
      { box: mix(tpl.bg, "#000000", 0.15), x: COL, y: TOP + 492, w: pageW - pad * 2, h: 2 },
      // HABILIDADES
      { txt: "HABILIDADES", size: 20, color: accent, x: COL, y: TOP + 524, font: FONT_BOLD },
      ...["Figma", "Design Systems", "Prototipado"].flatMap((s, n) => {
        const yy = TOP + 556 + n * 52;
        return [
          { txt: s, size: 17, color: ink, x: COL, y: yy },
          { box: mix(tpl.bg, "#000000", 0.12), x: COL + 250, y: yy + 4, w: pageW - 250 - pad, h: 10 },
          { box: accent, x: COL + 250, y: yy + 4, w: (pageW - 250 - pad) * (0.9 - n * 0.15), h: 10 },
        ];
      }),
      // pie de página TPL
      { txt: "www.cvmakerapp.vercel.app", size: 18, color: gray, x: "(w-text_w)/2", y: url_y },
      { txt: `Plantilla ${tpl.name} · ${TEMPLATES.length} para elegir`, size: 26, color: accent, x: "(w-text_w)/2", y: url_y + 40, font: FONT_BOLD },
    ],
  };
}

function ctaSlide() {
  return {
    bg: "#18181B",
    layers: [
      { txt: "Tu CV, listo en minutos", size: 64, color: "#FFFFFF", x: "(w-text_w)/2", y: "h*0.32", font: FONT_BOLD },
      { txt: "20 plantillas · PDF · Markdown", size: 34, color: "#A8A29E", x: "(w-text_w)/2", y: "h*0.42" },
      { box: "#C0392B", x: "(w-520)/2", y: "h*0.56", w: 520, h: 92 },
      { txt: "Crea tu CV ahora", size: 38, color: "#FFFFFF", x: "(w-text_w)/2", y: "h*0.56+21", font: FONT_BOLD },
      { txt: "cvmakerapp.vercel.app", size: 30, color: "#D6D3D1", x: "(w-text_w)/2", y: "h*0.8", font: FONT_BOLD },
      { txt: "CVMakerApp", size: 26, color: "#78716C", x: "(w-text_w)/2", y: "h*0.9" },
    ],
  };
}

// ---------- Render ----------
const slides = [introSlide(), ...slidesForWeek(weekIdx).map((t, i) => templateSlide(t, i)), ctaSlide()];

const tmp = join(ROOT, ".reel-tmp");
mkdirSync(tmp, { recursive: true });
const clips = [];
try {
  slides.forEach((s, i) => clips.push(renderSlide(s, tmp, i)));

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
  cmd.push("-f", "lavfi", "-i", audio, "-filter_complex", fc, "-map", "[vout]", "-map", `${clips.length}:a`, "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", "-shortest");
  const outPath = outArg || join(ROOT, "videos", `cvmakerapp-reel-${String(weekIdx).padStart(2, "0")}.mp4`);
  mkdirSync(join(outPath, ".."), { recursive: true });
  cmd.push(outPath);
  execFileSync("ffmpeg", cmd, { stdio: "inherit" });
  console.log("OK:", outPath);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}