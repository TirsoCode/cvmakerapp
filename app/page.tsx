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

const DARK = {
  bg: "#09090B",
  surface: "#131316",
  surface2: "#18181B",
  border: "rgba(255,255,255,0.08)",
  border2: "rgba(255,255,255,0.12)",
  text: "#FAFAFA",
  text2: "#A1A1AA",
  text3: "#67676F",
  accent: "#FFD803",
  red: "#E11D2E",
};

const btnPrimary: React.CSSProperties = {
  background: DARK.accent,
  color: "#000",
  fontWeight: 700,
  fontSize: 15,
  fontFamily: "var(--font-instrument), sans-serif",
  border: "none",
  borderRadius: 999,
  padding: "12px 28px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: "transform 80ms ease, box-shadow 80ms ease",
  boxShadow: "0 0 0 rgba(255,216,3,0)",
};

const btnGhost: React.CSSProperties = {
  background: "transparent",
  color: DARK.text,
  fontWeight: 600,
  fontSize: 15,
  fontFamily: "var(--font-instrument), sans-serif",
  border: `1px solid ${DARK.border2}`,
  borderRadius: 999,
  padding: "12px 28px",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: "background 100ms ease",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(28px, 4vw, 44px)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  margin: "0 0 10px",
  color: DARK.text,
  fontFamily: "var(--font-instrument), sans-serif",
};

const sectionSub: React.CSSProperties = {
  fontSize: 17,
  color: DARK.text2,
  fontFamily: "var(--font-instrument), sans-serif",
};

const card: React.CSSProperties = {
  background: DARK.surface,
  border: `1px solid ${DARK.border}`,
  borderRadius: 16,
  padding: "24px 26px",
};

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
      <p style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 4px", color: DARK.text3, fontFamily: "var(--font-instrument), sans-serif" }}>
        CV para
      </p>
      <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, margin: 0, padding: 0, color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
        {PHRASES[phraseIndex].slice(0, charIndex)}
        <span style={{ display: "inline-block", width: 4, height: "1em", background: DARK.red, marginLeft: 4, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />
      </h1>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: DARK.bg, minHeight: "100vh", color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(9,9,11,0.82)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${DARK.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
            CVMakerApp
          </span>
          <Link href="/editor" style={{ ...btnPrimary, padding: "9px 20px", fontSize: 13 }}>
            Crear mi CV
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 920, margin: "0 auto", padding: "110px 24px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: DARK.surface, border: `1px solid ${DARK.border}`, borderRadius: 999, padding: "7px 16px", marginBottom: 32 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: DARK.red, display: "inline-block" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: DARK.text2, fontFamily: "var(--font-instrument), sans-serif" }}>
            20 plantillas premium
          </span>
        </div>
        <TypewriterHero />
        <p style={{ fontSize: 18, lineHeight: 1.65, color: DARK.text2, maxWidth: 560, margin: "0 auto 36px", fontFamily: "var(--font-instrument), sans-serif" }}>
          20 plantillas premium · PDF · Markdown · Sin registro
        </p>
        <Link href="/editor" style={btnPrimary}>
          Empezar ahora — es gratis
        </Link>
      </section>

      {/* Hero image */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 0" }}>
        <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${DARK.border}`, boxShadow: "0 24px 80px rgba(0,0,0,0.55)", position: "relative" }}>
          <Image
            src="/foto.webp"
            alt="CVMakerApp preview"
            width={1600}
            height={831}
            priority
            quality={80}
            sizes="(min-width: 1280px) 100vw, 100vw"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* How it works */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "110px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={sectionTitle}>
            Crear tu CV nunca fue tan fácil
          </h2>
          <p style={sectionSub}>
            Tres pasos para un resultado profesional
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            {
              step: "01",
              title: "Elige tu plantilla",
              desc: "Explora 20 diseños únicos pensados para diferentes sectores y estilos. Minimalista, corporativo, creativo — hay una para cada perfil.",
            },
            {
              step: "02",
              title: "Rellena tus datos",
              desc: "Completa tu información de forma intuitiva. Añade tu experiencia, educación, habilidades, idiomas y proyectos.",
            },
            {
              step: "03",
              title: "Descarga y envíalo",
              desc: "Exporta tu CV en PDF de alta calidad para enviar por email, o en Markdown si trabajas con herramientas como Notion o GitHub.",
            },
          ].map((item, i) => (
            <div key={item.step} style={card}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: i === 0 ? DARK.red : DARK.text3, fontFamily: "var(--font-instrument), sans-serif", letterSpacing: "-0.03em" }}>
                  {item.step}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: DARK.text2, margin: 0, lineHeight: 1.7, fontFamily: "var(--font-instrument), sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates showcase */}
      <section style={{ background: DARK.surface, borderTop: `1px solid ${DARK.border}`, borderBottom: `1px solid ${DARK.border}`, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={sectionTitle}>
              Diseñadas para impresionar
            </h2>
            <p style={sectionSub}>
              Y 16 más disponibles en el editor
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
            {TEMPLATES.slice(0, 4).map((t) => (
              <div
                key={t.id}
                style={{
                  background: DARK.bg,
                  border: `1px solid ${DARK.border}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "transform 150ms ease, border-color 150ms ease",
                }}
              >
                <div style={{ height: 200, background: DARK.bg, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TemplateThumbnail id={t.id} accent={t.accent} />
                </div>
                <div style={{ padding: "14px 18px", borderTop: `1px solid ${DARK.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
                    <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
                      {t.name}
                    </h3>
                  </div>
                  <p style={{ fontSize: 11, color: DARK.text3, margin: 0, fontFamily: "var(--font-instrument), sans-serif" }}>
                    {t.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/editor" style={btnGhost}>
              Probar ahora — gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={sectionTitle}>
            Todo lo que necesitas para un CV perfecto
          </h2>
          <p style={sectionSub}>
            Herramientas profesionales sin complejidad innecesaria
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              title: "20 plantillas disponibles",
              desc: "Diseños cuidados hasta el último píxel. Desde el minimalista más limpio hasta el editorial más atrevido.",
            },
            {
              title: "Personalización total",
              desc: "Cambia colores y fuentes, y muestra u oculta las secciones que necesites. Tu CV, tus reglas.",
            },
            {
              title: "Exporta a PDF",
              desc: "Genera un PDF de alta calidad listo para enviar a cualquier empresa. Formato A4 estándar internacional.",
            },
            {
              title: "Exporta a Markdown",
              desc: "Descarga tu CV en formato Markdown para usarlo en Notion, GitHub, o cualquier herramienta que prefieras.",
            },
            {
              title: "Privacidad total",
              desc: "Todo se procesa en tu navegador: los datos se descartan al salir de la web. Nada se envía a ningún servidor.",
            },
            {
              title: "Vista previa en tiempo real",
              desc: "Verás los cambios al instante mientras escribes. Sin esperas, sin recargas. Todo fluye.",
            },
            {
              title: "Sin registro",
              desc: "Abre la página y empieza. No necesitas cuenta, email ni contraseña. Tu privacidad, respetada.",
            },
            {
              title: "Funciona en cualquier dispositivo",
              desc: "Edición optimizada para escritorio. Vista previa adaptable. Trabaja donde prefieras.",
            },
          ].map((f) => (
            <div key={f.title} style={card}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: DARK.surface2, border: `1px solid ${DARK.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: DARK.accent, display: "block" }} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: DARK.text2, margin: 0, lineHeight: 1.7, fontFamily: "var(--font-instrument), sans-serif" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Big visual section */}
      <section style={{ background: DARK.surface, borderTop: `1px solid ${DARK.border}`, borderBottom: `1px solid ${DARK.border}`, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1150, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ ...sectionTitle, fontSize: "clamp(30px, 4vw, 46px)", marginBottom: 20 }}>
              Tu historia en papel de lujo
            </h2>
            <p style={{ fontSize: 17, color: DARK.text2, lineHeight: 1.8, fontFamily: "var(--font-instrument), sans-serif" }}>
              Cada detalle cuenta. Cada línea, cada espacio en blanco, cada tipografía elegida con intención. CVMakerApp no es solo una herramienta: es una declaración de intenciones. Crea algo que la gente quiera mirar dos veces.
            </p>
          </div>
          <div>
            <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${DARK.border}`, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
              <Image src="/foto.webp" alt="Visual guay" width={800} height={500} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={sectionTitle}>
            ¿Para quién es CVMakerApp?
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            {
              title: "Para developers",
              desc: "Muestra tu código, proyectos en GitHub y stack técnico con una plantilla que entiende tu mundo.",
            },
            {
              title: "Para diseñadores",
              desc: "Tu portfolio empieza con un CV que ya dice mucho de tu gusto. Creatividad aplicada desde el primer folio.",
            },
            {
              title: "Para directivos",
              desc: "Plantillas sobrias y elegantes que transmiten autoridad y experiencia sin gritarlo.",
            },
            {
              title: "Para graduates",
              desc: "Destaca lo que sabes hacer aunque no tengas mucha experiencia. Cada sección cuenta.",
            },
          ].map((item) => (
            <div key={item.title} style={card}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: DARK.text2, margin: 0, lineHeight: 1.7, fontFamily: "var(--font-instrument), sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ borderTop: `1px solid ${DARK.border}`, textAlign: "center", background: DARK.surface }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "100px 24px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px", color: DARK.text, fontFamily: "var(--font-instrument), sans-serif" }}>
            Tu próxima oportunidad no espera
          </h2>
          <p style={{ fontSize: 17, color: DARK.text2, margin: "0 0 36px", fontFamily: "var(--font-instrument), sans-serif", lineHeight: 1.7 }}>
            Crea un CV que cuente tu historia. Profesional, memorable y listo para impresionar. Empieza ahora y tenlo listo en 10 minutos.
          </p>
          <Link href="/editor" style={btnPrimary}>
            Crear mi CV ahora
          </Link>
        </div>
      </section>

      {/* Big final name */}
      <section style={{ minHeight: "100vh", background: DARK.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 24px", borderBottom: `1px solid ${DARK.border}` }}>
        <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${DARK.border}`, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
          <Image src="/foto.webp" alt="Guay" width={400} height={200} style={{ width: 280, height: "auto", display: "block" }} />
        </div>
        <h2 style={{ fontSize: "clamp(72px, 17vw, 200px)", fontWeight: 700, letterSpacing: "-0.06em", lineHeight: 0.9, color: DARK.red, fontFamily: "var(--font-instrument), sans-serif" }}>
          CVMakerApp
        </h2>
        <p style={{ fontSize: 18, color: DARK.text2, marginTop: 28, maxWidth: 520, lineHeight: 1.6, fontFamily: "var(--font-instrument), sans-serif" }}>
          Crea tu currículum. Impresiona al mundo. En minutos.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 24px", background: DARK.bg, textAlign: "center" }}>
        <p style={{ fontSize: 13, color: DARK.text3, margin: "0 0 12px", fontFamily: "var(--font-instrument), sans-serif" }}>
          © {new Date().getFullYear()} CVMakerApp — Crea currículums profesionales en minutos
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <Link href="/politica-privacidad" style={{ fontSize: 12, color: DARK.text3, fontFamily: "var(--font-instrument), sans-serif", textDecoration: "none" }}>
            Política de Privacidad
          </Link>
          <Link href="/politica-cookies" style={{ fontSize: 12, color: DARK.text3, fontFamily: "var(--font-instrument), sans-serif", textDecoration: "none" }}>
            Política de Cookies
          </Link>
        </div>
      </footer>
    </main>
  );
}

function TemplateThumbnail({ id, accent }: { id: string; accent: string }) {
  const scale = 0.36;
  const w = Math.round(210 * scale);
  const h = Math.round(297 * scale);

  if (id === "minimal") {
    return (
      <div style={{ width: w, height: h, background: "#fff", padding: `${Math.round(14 * scale)}px ${Math.round(16 * scale)}px`, fontFamily: "Georgia, serif", boxShadow: "0 2px 16px rgba(255,255,255,0.12)", transform: `scale(${scale})`, transformOrigin: "center" }}>
        <div style={{ width: "60%", height: 5, background: "#1A1918", borderRadius: 2, marginBottom: 4 }} />
        <div style={{ width: "40%", height: 3, background: accent, borderRadius: 2, marginBottom: 8 }} />
        <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
        <div style={{ width: "85%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
        <div style={{ width: "70%", height: 2, background: "#E4E2DC" }} />
      </div>
    );
  }
  if (id === "editorial") {
    return (
      <div style={{ width: w, height: h, background: "#fff", display: "grid", gridTemplateColumns: "35% 1fr", fontFamily: "Georgia, serif", boxShadow: "0 2px 16px rgba(255,255,255,0.12)", transform: `scale(${scale})`, transformOrigin: "center", overflow: "hidden" }}>
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
      </div>
    );
  }
  if (id === "modern") {
    return (
      <div style={{ width: w, height: h, background: "#fff", fontFamily: "system-ui, sans-serif", boxShadow: "0 2px 16px rgba(255,255,255,0.12)", transform: `scale(${scale})`, transformOrigin: "center", overflow: "hidden" }}>
        <div style={{ background: "#1A1918", padding: `${Math.round(10 * scale)}px ${Math.round(14 * scale)}px` }}>
          <div style={{ width: "55%", height: 5, background: "#fff", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ width: "35%", height: 2, background: accent, borderRadius: 2 }} />
        </div>
        <div style={{ padding: `${Math.round(10 * scale)}px ${Math.round(14 * scale)}px` }}>
          <div style={{ width: "90%", height: 2, background: accent, borderRadius: 2, marginBottom: 5 }} />
          <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "75%", height: 2, background: "#E4E2DC" }} />
        </div>
      </div>
    );
  }
  if (id === "prussian") {
    return (
      <div style={{ width: w, height: h, background: "#fff", fontFamily: "Georgia, serif", boxShadow: "0 2px 16px rgba(255,255,255,0.12)", transform: `scale(${scale})`, transformOrigin: "center", overflow: "hidden" }}>
        <div style={{ background: "#1E3A5F", padding: `${Math.round(12 * scale)}px ${Math.round(14 * scale)}px` }}>
          <div style={{ width: "55%", height: 5, background: "#fff", borderRadius: 2, marginBottom: 3 }} />
          <div style={{ width: "35%", height: 2, background: accent, borderRadius: 2 }} />
        </div>
        <div style={{ padding: `${Math.round(10 * scale)}px ${Math.round(14 * scale)}px` }}>
          <div style={{ width: "90%", height: 2, background: "#1E3A5F", borderRadius: 2, marginBottom: 5 }} />
          <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
          <div style={{ width: "75%", height: 2, background: "#E4E2DC" }} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: w, height: h, background: "#fff", padding: `${Math.round(14 * scale)}px`, fontFamily: "Georgia, serif", boxShadow: "0 2px 16px rgba(255,255,255,0.12)", transform: `scale(${scale})`, transformOrigin: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ width: "70%", height: 4, background: "#1A1918", borderRadius: 2, margin: "0 auto 3px" }} />
        <div style={{ width: "40%", height: 2, background: accent, borderRadius: 2, margin: "0 auto" }} />
      </div>
      <div style={{ width: "100%", height: 1, background: "#E4E2DC", marginBottom: 4 }} />
      <div style={{ width: "100%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
      <div style={{ width: "80%", height: 2, background: "#E4E2DC", marginBottom: 2 }} />
      <div style={{ width: "90%", height: 2, background: "#E4E2DC" }} />
    </div>
  );
}