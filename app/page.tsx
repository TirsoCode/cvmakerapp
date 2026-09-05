"use client";
import Link from "next/link";
import { TEMPLATES } from "@/lib/types";
import { useState, useEffect } from "react";

const PHRASES = [
  "El CV que tu próxima oportunidad merece",
  "Tu curriculum como developer, sin complicaciones",
  "CVs que impresionan a empresas de tech",
  "Tu carta de presentación como developer",
  "Un CV outstanding en 10 minutos",
  "Destaca entre cientos de candidatos",
  "Tu curriculum, tu marca personal",
  "Diseñado para recruiters de tech",
  "El CV perfecto no existe, pero este ayuda",
  "Tu código habla, tu CV también",
  "Crea, personaliza, descarga,envía",
  "CVs para developers que buscan成長",
  "Tu próxima entrevista empieza aquí",
  "Muestra lo que sabes hacer",
  "CVs con personalidad técnica",
  "De junior a senior, un CV a la vez",
  "Sin filtro, sin BS, solo resultados",
  "Tu curriculum en tiempo récord",
  "El CV que los hiring managers recuerdan",
  "Tu siguiente paso en tech empieza aquí",
];

function TypewriterHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
        } else {
          setDeleting(false);
          setPhraseIndex((phraseIndex + 1) % PHRASES.length);
        }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <h1 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 20px", color: "#1A1918", fontFamily: "'Playfair Display', serif", minHeight: "2.3em" }}>
      {PHRASES[phraseIndex].slice(0, charIndex)}
      <span style={{ borderRight: "2px solid #C0392B", marginLeft: 2, paddingRight: 1, animation: "blink 1s step-end infinite" }} />
    </h1>
  );
}

export default function Home() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #E4E2DC", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill="#1A1918"/>
              <text x="16" y="22" textAnchor="middle" fontSize="17" fill="white" fontFamily="serif" fontWeight="700">R</text>
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
              createCV
            </span>
          </div>
          <Link
            href="/editor"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              background: "#1A1918",
              color: "#fff",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            Crear mi CV
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "88px 24px 72px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F3F2EE", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#6B6860", fontFamily: "'Instrument Sans', sans-serif" }}>
            20 plantillas premium
          </span>
        </div>
        <TypewriterHero />
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "#6B6860", maxWidth: 500, margin: "0 auto 32px", fontFamily: "'Instrument Sans', sans-serif" }}>
          20 plantillas premium, exportación a PDF y Markdown, personalización total. Sin registro.
        </p>
        <Link
          href="/editor"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "15px 36px",
            background: "#C0392B",
            color: "#fff",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "'Instrument Sans', sans-serif",
            boxShadow: "0 4px 14px rgba(192,57,43,0.25)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
          </svg>
          Empezar ahora — es gratis
        </Link>
      </section>

      {/* How it works */}
      <section style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
              Crear tu CV nunca fue tan fácil
            </h2>
            <p style={{ fontSize: 16, color: "#6B6860", fontFamily: "'Instrument Sans', sans-serif" }}>
              Tres pasos para un resultado profesional
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            {[
              {
                step: "01",
                title: "Elige tu plantilla",
                desc: "Explora 20 diseños únicos pensados para diferentes sectores y estilos. Minimalista, corporativo, creativo — hay una para cada perfil.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                ),
              },
              {
                step: "02",
                title: "Rellena tus datos",
                desc: "Completa tu información de forma intuitiva. Añade tu experiencia, educación, habilidades, idiomas y proyectos. Sube tu foto si lo deseas.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                ),
              },
              {
                step: "03",
                title: "Descarga y envíalo",
                desc: "Exporta tu CV en PDF de alta calidad para enviar por email, o en Markdown si trabajas con herramientas como Notion o GitHub.",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 36, fontWeight: 800, color: "#E4E2DC", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.03em" }}>
                    {item.step}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", color: "#1A1918", fontFamily: "'Instrument Sans', sans-serif" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "'Instrument Sans', sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates showcase */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
            Diseñadas para impresionar
          </h2>
          <p style={{ fontSize: 16, color: "#6B6860", fontFamily: "'Instrument Sans', sans-serif" }}>
            Y 16 más disponibles en el editor
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 18 }}>
          {TEMPLATES.slice(0, 4).map((t) => (
            <div
              key={t.id}
              style={{
                background: "#fff",
                border: "1px solid #E4E2DC",
                borderRadius: 14,
                overflow: "hidden",
                transition: "transform 150ms ease, box-shadow 150ms ease",
              }}
            >
              <div style={{ height: 180, background: t.bg, padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TemplateThumbnail id={t.id} accent={t.accent} />
              </div>
              <div style={{ padding: "14px 18px", borderTop: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
                  <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#1A1918", fontFamily: "'Instrument Sans', sans-serif" }}>
                    {t.name}
                  </h3>
                </div>
                <p style={{ fontSize: 11, color: "#9C9890", margin: 0, fontFamily: "'Instrument Sans', sans-serif" }}>
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link
            href="/editor"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              background: "#1A1918",
              color: "#fff",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            Probar ahora — gratis
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
              Todo lo que necesitas para un CV perfecto
            </h2>
            <p style={{ fontSize: 16, color: "#6B6860", fontFamily: "'Instrument Sans', sans-serif" }}>
              Herramientas profesionales sin complejidad innecesaria
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 36 }}>
            {[
              {
                title: "20 plantillas disponibles",
                desc: "Diseños cuidados hasta el último píxel. Desde el minimalista más limpio hasta el editorial más atrevido.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
              },
              {
                title: "Personalización total",
                desc: "Cambia colores, fuentes, espaciado y muestra u oculta las secciones que necesites. Tu CV, tus reglas.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
              },
              {
                title: "Exporta a PDF",
                desc: "Genera un PDF de alta calidad listo para enviar a cualquier empresa. Formato A4 estándar internacional.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>,
              },
              {
                title: "Exporta a Markdown",
                desc: "Descarga tu CV en formato Markdown para usarlo en Notion, GitHub, o cualquier herramienta que prefieras.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><path d="M4 4l1.8 1.8M4 4v5.2M4 4h5.2"/><path d="M20 4l-1.8 1.8M20 4v5.2M20 4h-5.2"/><path d="M4 20l1.8-1.8M4 20v-5.2M4 20h5.2"/><path d="M20 20l-1.8-1.8M20 20v-5.2M20 20h-5.2"/></svg>,
              },
              {
                title: "Añade tu foto",
                desc: "Sube una foto de perfil directamente desde tu ordenador. Se ajusta automáticamente al formato ideal.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>,
              },
              {
                title: "Vista previa en tiempo real",
                desc: "Verás los cambios al instante mientras escribes. Sin esperas, sin recargas. Todo fluye.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
              },
              {
                title: "Sin registro",
                desc: "Abre la página y empieza. No necesitas cuenta, email ni contraseña. Tu privacidad, respetada.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              },
              {
                title: "Funciona en cualquier dispositivo",
                desc: "Edición optimizada para escritorio. Vista previa adaptable. Trabaja donde prefieras.",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
              },
            ].map((f) => (
              <div key={f.title} style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 6px", color: "#1A1918", fontFamily: "'Instrument Sans', sans-serif" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 12, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "'Instrument Sans', sans-serif" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
            ¿Para quién es createCV?
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
            <div key={item.title} style={{ background: "#fff", border: "1px solid #E4E2DC", borderRadius: 14, padding: "24px 28px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px", color: "#1A1918", fontFamily: "'Instrument Sans', sans-serif" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 13, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "'Instrument Sans', sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: "#1A1918", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px" }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px", color: "#fff", fontFamily: "'Playfair Display', serif" }}>
            Tu próxima oportunidad no espera
          </h2>
          <p style={{ fontSize: 16, color: "#9C9890", margin: "0 0 32px", fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.6 }}>
            Crea un CV que cuente tu historia. Profesional, memorable y listo para impresionar. Empieza ahora y tenlo listo en 10 minutos.
          </p>
          <Link
            href="/editor"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 36px",
              background: "#C0392B",
              color: "#fff",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'Instrument Sans', sans-serif",
              boxShadow: "0 4px 14px rgba(192,57,43,0.35)",
            }}
          >
            Crear mi CV ahora
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E4E2DC", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#9C9890", margin: 0, fontFamily: "'Instrument Sans', sans-serif" }}>
          © {new Date().getFullYear()} createCV — Crea currículums profesionales en minutos
        </p>
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
      <div style={{ width: w, height: h, background: "#fff", padding: `${Math.round(14 * scale)}px ${Math.round(16 * scale)}px`, fontFamily: "Georgia, serif", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transform: `scale(${scale})`, transformOrigin: "center" }}>
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
      <div style={{ width: w, height: h, background: "#fff", display: "grid", gridTemplateColumns: "35% 1fr", fontFamily: "Georgia, serif", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transform: `scale(${scale})`, transformOrigin: "center", overflow: "hidden" }}>
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
      <div style={{ width: w, height: h, background: "#fff", fontFamily: "system-ui, sans-serif", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transform: `scale(${scale})`, transformOrigin: "center", overflow: "hidden" }}>
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
      <div style={{ width: w, height: h, background: "#fff", fontFamily: "Georgia, serif", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transform: `scale(${scale})`, transformOrigin: "center", overflow: "hidden" }}>
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
    <div style={{ width: w, height: h, background: "#fff", padding: `${Math.round(14 * scale)}px`, fontFamily: "Georgia, serif", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", transform: `scale(${scale})`, transformOrigin: "center" }}>
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
