"use client";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATES } from "@/lib/types";
import { useState, useEffect } from "react";

const PHRASES = [
  "Full Stack Developer",
  "Marketing Manager",
  "Abogado",
  "Enfermero",
  "Arquitecto",
  "Chef Ejecutivo",
  "Contador",
  "Médico",
  "Profesor",
  "Diseñador Gráfico",
  "Ingeniero Civil",
  "Psicólogo",
  "Fotógrafo",
  "Economista",
  "Periodista",
  "Farmacólogo",
  "Director de Ventas",
  "Piloto Comercial",
  "Community Manager",
  "Dentista",
  "Veterinario",
  "Electricista",
  "Fontanero",
  "Mecánico",
  "Peluquero",
  "Bombero",
  "Cocinero",
  "Carpintero",
  "Policía",
  "Conductor",
  "Astrónomo",
  "Biólogo",
  "Químico",
  "Traductor",
  "Actor",
  "Músico",
  "Albañil",
  "Jardinero",
  "Camarero",
  "Panadero",
];

function TypewriterHero() {
  const [phraseIndex, setPhraseIndex] = useState(() => Math.floor(Math.random() * PHRASES.length));
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 2500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setPhraseIndex((i) => (i + 1) % PHRASES.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 2px", color: "#9C9890", fontFamily: "var(--font-playfair), serif" }}>
        CV para
      </p>
      <h1 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0, padding: 0, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
        {PHRASES[phraseIndex].slice(0, charIndex)}
        <span style={{ display: "inline-block", width: 3, height: "1em", background: "#C0392B", marginLeft: 3, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />
      </h1>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #E4E2DC", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              CVMakerApp
            </span>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {[
              { href: "#como-funciona", label: "Cómo funciona" },
              { href: "#plantillas", label: "Plantillas" },
              { href: "#comparativa", label: "Comparativa" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a key={item.href} href={item.href} style={{ fontSize: 13, color: "#6B6860", textDecoration: "none", fontFamily: "var(--font-instrument), sans-serif", fontWeight: 500 }}>
                {item.label}
              </a>
            ))}
          </nav>
          <Link className="boton-neobrutalista boton-neobrutalista-primario" href="/editor" style={{ padding: "8px 18px", fontSize: 13 }}>
            Crear mi CV
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 48px", display: "grid", gridTemplateColumns: "5fr 7fr", gap: 48, alignItems: "center" }}>
        <div style={{ paddingLeft: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F3F2EE", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
              Diseños profesionales
            </span>
          </div>
          <TypewriterHero />
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#6B6860", maxWidth: 500, margin: "0 0 28px", fontFamily: "var(--font-instrument), sans-serif" }}>
            Elige tu plantilla, escribe tus datos y descarga tu PDF en minutos. Sin registro, sin marca de agua y sin esperas.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="boton-neobrutalista boton-neobrutalista-primario" href="/editor">
              Empezar ahora — es gratis
            </Link>
            <a className="boton-neobrutalista" href="#plantillas" style={{ background: "#fff", color: "#1A1918" }}>
              Ver plantillas
            </a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
            src="/foto.webp"
            alt="CVMakerApp preview"
            width={1600}
            height={831}
            priority
            quality={80}
            sizes="(min-width: 1280px) 50vw, (min-width: 768px) 60vw, 100vw"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: 900,
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 24 }}>
          {[
            { n: "12", label: "secciones editables", accent: "#2563EB" },
            { n: "0", label: "euros · registros", accent: "#16A34A" },
            { n: "2", label: "formatos: PDF y Markdown", accent: "#7C3AED" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {s.n}
              </div>
              <div style={{ width: 28, height: 3, borderRadius: 2, background: s.accent, margin: "10px auto" }} />
              <div style={{ fontSize: 12, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 72px" }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Así de fácil</span>
          <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", margin: "8px 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
            Tres pasos, cero fricción
          </h2>
          <p style={{ fontSize: 16, color: "#6B6860", maxWidth: 520, fontFamily: "var(--font-instrument), sans-serif" }}>
            No necesitas cuenta, ni tutorial, ni curva de aprendizaje. Solo abres, escribes y descargas.
          </p>
        </div>
        <div style={{ position: "relative", paddingTop: 8 }}>
          <div style={{ position: "absolute", top: 34, left: "12%", right: "12%", height: 1, background: "#E4E2DC" }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            {[
              { step: "01", title: "Elige tu plantilla", desc: "Diseños únicos para cada sector y estilo: minimalista, corporativo, creativo." },
              { step: "02", title: "Rellena tus datos", desc: "Experiencia, educación, habilidades, idiomas y proyectos, con vista previa en vivo." },
              { step: "03", title: "Descarga y envíalo", desc: "Exporta a PDF sin marca de agua, o a Markdown para Notion o GitHub." },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", border: "1px solid #E4E2DC", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", position: "relative", zIndex: 2 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#C0392B", fontFamily: "var(--font-playfair), serif" }}>{item.step}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "var(--font-instrument), sans-serif" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates spotlight */}
      <section id="plantillas" style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Plantillas en foco</span>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", margin: "8px 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              Tres estilos, un estándar de cuidado
            </h2>
            <p style={{ fontSize: 16, color: "#6B6860", maxWidth: 520, fontFamily: "var(--font-instrument), sans-serif" }}>
              Cada plantilla está pensada para un tipo de perfil. Mira estas tres y encuentra la tuya en el editor.
            </p>
          </div>

          {/* Spotlight 1: Minimal — texto + página */}
          <Spotlight
            title="Minimal"
            pitch="Menos es más. Tipografía limpia, mucho aire y un punto de color para que lo importante brille."
            tags={["clean", "sans", "universal"]}
            accent="#1A1918"
            reverse={false}
            centered={false}
          >
            <ThumbnailTile bg="#FFFFFF">
              <TemplateThumbnail id="minimal" accent="#1A1918" scale={0.68} />
            </ThumbnailTile>
          </Spotlight>

          {/* Spotlight 2: Editorial — página + texto */}
          <Spotlight
            title="Editorial"
            pitch="Dos columnas, serif de revista y un acento rojo que da carácter. Perfecta para perfiles creativos y senior."
            tags={["two-col", "serif", "editorial"]}
            accent="#C0392B"
            reverse={true}
            centered={false}
          >
            <ThumbnailTile bg="#FFF9F8">
              <TemplateThumbnail id="editorial" accent="#C0392B" scale={0.68} />
            </ThumbnailTile>
          </Spotlight>

          {/* Spotlight 3: Modern — centrado */}
          <Spotlight
            title="Modern"
            pitch="Cabecero con fuerza, barras de color y fechas en mono. La elección natural del perfil tech."
            tags={["bold", "tech", "gradient"]}
            accent="#2563EB"
            reverse={false}
            centered={true}
          >
            <ThumbnailTile bg="#EEF3FF">
              <TemplateThumbnail id="modern" accent="#2563EB" scale={0.68} />
            </ThumbnailTile>
          </Spotlight>

          {/* Resto de plantillas */}
          <div style={{ marginTop: 48, borderTop: "1px solid #E4E2DC", paddingTop: 32 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1A1918", margin: "0 0 14px", fontFamily: "var(--font-instrument), sans-serif" }}>
                Más plantillas, también gratis:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TEMPLATES.filter((t) => !["minimal", "editorial", "modern"].includes(t.id)).map((t) => (
                <Link
                  key={t.id}
                  href="/editor"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12,
                    fontWeight: 600, color: "#1A1918", background: "#FAFAF8",
                    border: "1px solid #E4E2DC", borderRadius: 999, padding: "7px 14px",
                    textDecoration: "none", fontFamily: "var(--font-instrument), sans-serif",
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparativa" style={{ background: "#F3F2EE", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sin letra pequeña</span>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", margin: "8px 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              CVMakerApp frente al resto
            </h2>
          </div>

          <div style={{ overflow: "hidden", borderRadius: 16, border: "1px solid #E4E2DC", background: "#FAFAF8" }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(140px, 1.1fr) 1.4fr 1.4fr", background: "#1A1918", color: "#fff", padding: "14px 20px" }}>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-instrument), sans-serif" }} />
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-playfair), serif" }}>CVMakerApp</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>Las demás</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} style={{ display: "grid", gridTemplateColumns: "minmax(140px, 1.1fr) 1.4fr 1.4fr", borderTop: "1px solid #E4E2DC", background: i % 2 === 0 ? "#FFFFFF" : "#FAFAF8", padding: "14px 20px", alignItems: "center" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>{row.feature}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>
                  <Check />
                  {row.us}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
                  <Cross />
                  {row.them}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="opiniones" style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Gente como tú</span>
          <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", margin: "8px 0 0", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
            Lo que cuentan los CV creados aquí
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.author} style={{ margin: 0, background: i === 0 ? "#fff" : "transparent", border: i === 0 ? "1px solid #E4E2DC" : "1px solid #ECE9E2", borderRadius: 14, padding: "28px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: i === 0 ? "0 12px 32px rgba(0,0,0,0.05)" : "none" }}>
              <blockquote style={{ margin: 0, padding: 0 }}>
                <div style={{ fontSize: 34, lineHeight: 1, color: "#C0392B", fontFamily: "var(--font-playfair), serif", marginBottom: 10 }}>“</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#1A1918", margin: 0, fontFamily: "var(--font-instrument), sans-serif" }}>{t.quote}</p>
              </blockquote>
              <figcaption style={{ marginTop: 18 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>{t.author}</div>
                <div style={{ fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#C0392B", textTransform: "uppercase", letterSpacing: "0.1em" }}>Preguntas frecuentes</span>
            <h2 style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.03em", margin: "8px 0 0", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              Todo lo que dudas, respondido
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQ.map((item) => (
              <details key={item.q} style={{ border: "1px solid #E4E2DC", borderRadius: 12, background: "#FAFAF8", padding: "4px 4px" }}>
                <summary style={{ cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#1A1918", padding: "14px 18px", fontFamily: "var(--font-instrument), sans-serif", listStyle: "none" }}>
                  {item.q}
                </summary>
                <p style={{ fontSize: 13, color: "#6B6860", margin: 0, padding: "0 18px 16px", lineHeight: 1.65, fontFamily: "var(--font-instrument), sans-serif" }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#1A1918", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px", color: "#fff", fontFamily: "var(--font-playfair), serif" }}>
            Tu próxima oportunidad no espera
          </h2>
          <p style={{ fontSize: 16, color: "#9C9890", margin: "0 0 32px", fontFamily: "var(--font-instrument), sans-serif", lineHeight: 1.6 }}>
            Crea un CV que cuente tu historia. Profesional, memorable y listo para impresionar. Empieza ahora y tenlo listo en 10 minutos.
          </p>
          <Link className="boton-neobrutalista boton-neobrutalista-primario" href="/editor">
            Crear mi CV ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E4E2DC", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#9C9890", margin: "0 0 8px", fontFamily: "var(--font-instrument), sans-serif" }}>
          © {new Date().getFullYear()} CVMakerApp — Crea currículums profesionales en minutos
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          <Link href="/politica-privacidad" style={{ fontSize: 11, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif", textDecoration: "none" }}>
            Política de Privacidad
          </Link>
          <Link href="/politica-cookies" style={{ fontSize: 11, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif", textDecoration: "none" }}>
            Política de Cookies
          </Link>
        </div>
      </footer>
    </main>
  );
}

const COMPARISON = [
  { feature: "Precio", us: "Gratis para siempre", them: "Suscripción mensual" },
  { feature: "Registro", us: "Ninguno", them: "Obligatorio" },
    { feature: "Plantillas", us: "Premium", them: "2–5 básicas" },
  { feature: "Exportar PDF", us: "Sí, sin marca de agua", them: "A menudo de pago" },
  { feature: "Tus datos", us: "Solo en tu navegador", them: "En sus servidores" },
  { feature: "Primer CV", us: "En minutos", them: "Horas de setup" },
];

const TESTIMONIALS = [
  { quote: "Me sorprendió lo bien que quedaba mi CV. En diez minutos tenía un PDF que mandé a tres empresas y recibí dos entrevistas.", author: "Laura M.", role: "Product Designer" },
  { quote: "Sin registro, sin pagar, sin historias. Escribes y descargas.", author: "Carlos R.", role: "Ingeniero de software" },
  { quote: "La plantilla editorial es una pasada. Parece un CV de los que cuestan 40 euros.", author: "Nadia P.", role: "Fotógrafa" },
];

const FAQ = [
  { q: "¿Necesito registrarme?", a: "No. Abre la web, escribe y descarga. No pedimos email ni contraseña ni permiso para nada." },
  { q: "¿Cuánto cuesta?", a: "Nada. La herramienta es gratis, sin planes ocultos y sin marca de agua en el PDF." },
  { q: "¿Dónde se guardan mis datos?", a: "Solo en tu navegador. Nada se sube a ningún servidor, así que tu CV no puede acabar en manos de nadie." },
  { q: "¿Puedo exportar mi CV en PDF?", a: "Sí, con un clic obtienes un PDF A4 listo para enviar. También puedes exportar a Markdown o imprimir directamente." },
  { q: "¿Puedo compartir mi CV?", a: "Sí. Generas un enlace corto con tu CV comprimido; quien lo abra podrá verlo y descargarlo sin registrarse." },
];

function Check() {
  return <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#E7F4EA", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#16A34A", fontSize: 10, fontWeight: 800 }}>✓</span>;
}

function Cross() {
  return <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#F3EEEE", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#C0392B", fontSize: 10, fontWeight: 800 }}>✕</span>;
}

function ThumbnailTile({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, border: "1px solid #E4E2DC", borderRadius: 16, padding: "28px 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}>
      {children}
    </div>
  );
}

function Spotlight({ title, pitch, tags, accent, reverse, centered, children }: {
  title: string;
  pitch: string;
  tags: string[];
  accent: string;
  reverse?: boolean;
  centered?: boolean;
  children: React.ReactNode;
}) {
  const copy = (
    <div style={{ textAlign: centered ? "center" : "left", maxWidth: centered ? 440 : "none", margin: centered ? "0 auto" : undefined }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: accent, display: "inline-block" }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "var(--font-instrument), sans-serif" }}>{title}</span>
      </div>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: "#1A1918", margin: "0 0 16px", fontFamily: "var(--font-instrument), sans-serif", fontWeight: 500 }}>
        {pitch}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: centered ? "center" : "flex-start", marginBottom: 20 }}>
        {tags.map((tag) => (
          <span key={tag} style={{ fontSize: 11, fontWeight: 600, color: "#6B6860", background: "#F3F2EE", border: "1px solid #E4E2DC", borderRadius: 999, padding: "4px 12px", fontFamily: "var(--font-instrument), sans-serif" }}>
            {tag}
          </span>
        ))}
      </div>
      <Link className="boton-neobrutalista-sm" href="/editor" style={{ padding: "7px 16px", fontSize: 12 }}>
        Probar {title}
      </Link>
    </div>
  );

  if (centered) {
    return (
      <div style={{ marginBottom: 64 }}>
        <div style={{ marginBottom: 32 }}>{children}</div>
        {copy}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 44, alignItems: "center", order: reverse ? 1 : 0 }}>
      <div style={{ order: reverse ? 1 : 0 }}>{copy}</div>
      <div style={{ order: reverse ? 0 : 1 }}>{children}</div>
    </div>
  );
}

function TemplateThumbnail({ id, accent, scale = 0.36 }: { id: string; accent: string; scale?: number }) {
  const w = Math.round(210 * scale);
  const h = Math.round(297 * scale);

  if (id === "minimal") {
    return (
      <ResumePage w={w} h={h} scale={scale}>
        <div style={{ width: "60%", height: 5, background: "#1A1918", borderRadius: 2, marginBottom: 4 }} />
        <div style={{ width: "40%", height: 3, background: accent, borderRadius: 2, marginBottom: 8 }} />
        <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
        <div style={{ width: "85%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
        <div style={{ width: "70%", height: 2, background: "#E4E2DC" }} />
      </ResumePage>
    );
  }
  if (id === "editorial") {
    return (
      <ResumePage w={w} h={h} scale={scale} grid>
        <div style={{ background: "#1A1918", padding: `${Math.round(14 * scale)}px` }}>
          <div style={{ width: "80%", height: 3, background: "#F3F2EE", borderRadius: 2, marginBottom: 4 }} />
          <div style={{ width: "60%", height: 2, background: "#6B6860", borderRadius: 2, marginBottom: 2 }} />
          <div style={{ width: "70%", height: 2, background: "#6B6860", borderRadius: 2 }} />
        </div>
        <div style={{ padding: `${Math.round(12 * scale)}px` }}>
          <div style={{ width: "90%", height: 3, background: accent, borderRadius: 2, marginBottom: 6 }} />
          <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "80%", height: 2, background: "#E4E2DC" }} />
        </div>
      </ResumePage>
    );
  }
  if (id === "modern") {
    return (
      <ResumePage w={w} h={h} scale={scale}>
        <div style={{ background: "#1A1918", padding: `${Math.round(10 * scale)}px ${Math.round(14 * scale)}px`, width: "100%" }}>
          <div style={{ width: "55%", height: 5, background: "#fff", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ width: "35%", height: 2, background: accent, borderRadius: 2 }} />
        </div>
        <div style={{ padding: `${Math.round(10 * scale)}px ${Math.round(14 * scale)}px`, width: "100%" }}>
          <div style={{ width: "90%", height: 2, background: accent, borderRadius: 2, marginBottom: 5 }} />
          <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "75%", height: 2, background: "#E4E2DC" }} />
        </div>
      </ResumePage>
    );
  }
  return (
    <ResumePage w={w} h={h} scale={scale}>
      <div style={{ textAlign: "center", marginBottom: 6, width: "100%" }}>
        <div style={{ width: "70%", height: 4, background: "#1A1918", borderRadius: 2, margin: "0 auto 3px" }} />
        <div style={{ width: "40%", height: 2, background: accent, borderRadius: 2, margin: "0 auto" }} />
      </div>
      <div style={{ width: "100%", height: 1, background: "#E4E2DC", marginBottom: 4 }} />
      <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
      <div style={{ width: "80%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
      <div style={{ width: "90%", height: 2, background: "#E4E2DC" }} />
    </ResumePage>
  );
}

function ResumePage({ w, h, scale, grid, children }: { w: number; h: number; scale: number; grid?: boolean; children: React.ReactNode }) {
  const base: React.CSSProperties = {
    width: w,
    height: h,
    background: "#fff",
    fontFamily: "Georgia, serif",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    transform: `scale(${scale})`,
    transformOrigin: "center",
  };
  if (grid) {
    return (
      <div style={{ ...base, display: "grid", gridTemplateColumns: "35% 1fr", overflow: "hidden" }}>
        {children}
      </div>
    );
  }
  return (
    <div style={{ ...base, padding: `${Math.round(14 * scale)}px`, boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "stretch", overflow: "hidden" }}>
      {children}
    </div>
  );
}