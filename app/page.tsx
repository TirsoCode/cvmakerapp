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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              CVMakerApp
            </span>
          </div>
          <Link className="boton-neobrutalista" href="/editor" style={{ padding: "8px 18px", fontSize: 13 }}>
            Crear mi CV
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 48px", display: "grid", gridTemplateColumns: "5fr 7fr", gap: 48, alignItems: "center" }}>
        {/* Left: text */}
        <div style={{ paddingLeft: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F3F2EE", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C0392B", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
              20 plantillas premium
            </span>
          </div>
          <TypewriterHero />
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "#6B6860", maxWidth: 500, margin: "0 0 28px", fontFamily: "var(--font-instrument), sans-serif" }}>
            20 plantillas premium · PDF · Markdown · Sin registro
          </p>
          <Link className="boton-neobrutalista boton-neobrutalista-primario" href="/editor">
            Empezar ahora — es gratis
          </Link>
        </div>
        {/* Right: image */}
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

      {/* How it works */}
      <section style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              Crear tu CV nunca fue tan fácil
            </h2>
            <p style={{ fontSize: 16, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
              Tres pasos para un resultado profesional
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
            {[
              {
                step: "01",
                title: "Elige tu plantilla",
                desc: "Explora 20 diseños únicos pensados para diferentes sectores y estilos. Minimalista, corporativo, creativo — hay una para cada perfil.",
              },
              {
                step: "02",
                title: "Rellena tus datos",
                desc: "Completa tu información de forma intuitiva. Añade tu experiencia, educación, habilidades, idiomas y proyectos. Sube tu foto si lo deseas.",
              },
              {
                step: "03",
                title: "Descarga y envíalo",
                desc: "Exporta tu CV en PDF de alta calidad para enviar por email, o en Markdown si trabajas con herramientas como Notion o GitHub.",
              },
            ].map((item) => (
              <div key={item.step} style={{ background: "#fff", border: "2px solid #000", boxShadow: "4px 4px 0 0 #000", padding: "24px 20px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, border: "2px solid #000", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "2px 2px 0 0 #000" }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
                    {item.step}
                  </span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 10px", color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "var(--font-instrument), sans-serif" }}>
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
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
            Diseñadas para impresionar
          </h2>
          <p style={{ fontSize: 16, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
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
                  <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>
                    {t.name}
                  </h3>
                </div>
                <p style={{ fontSize: 11, color: "#9C9890", margin: 0, fontFamily: "var(--font-instrument), sans-serif" }}>
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link className="boton-neobrutalista" href="/editor">
            Probar ahora — gratis
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
              Todo lo que necesitas para un CV perfecto
            </h2>
            <p style={{ fontSize: 16, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
              Herramientas profesionales sin complejidad innecesaria
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 36 }}>
            {[
              {
                title: "20 plantillas disponibles",
                desc: "Diseños cuidados hasta el último píxel. Desde el minimalista más limpio hasta el editorial más atrevido.",
              },
              {
                title: "Personalización total",
                desc: "Cambia colores, fuentes, espaciado y muestra u oculta las secciones que necesites. Tu CV, tus reglas.",
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
                title: "Añade tu foto",
                desc: "Sube una foto de perfil directamente desde tu ordenador. Se ajusta automáticamente al formato ideal.",
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
              <div key={f.title} style={{ background: "#fff", border: "2px solid #000", boxShadow: "4px 4px 0 0 #000", padding: "20px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 6px", color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 12, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "var(--font-instrument), sans-serif" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>
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
            <div key={item.title} style={{ background: "#fff", border: "1px solid #E4E2DC", borderRadius: 14, padding: "24px 28px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px", color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 13, color: "#6B6860", margin: 0, lineHeight: 1.6, fontFamily: "var(--font-instrument), sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
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
