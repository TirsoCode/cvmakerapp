"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FAQ } from "../lib/faq";

const PHRASES = [
  "Full Stack Developer",
  "Marketing Manager",
  "Abogado",
  "Enfermero",
  "Arquitecto",
  "Chef Ejecutivo",
  "Diseñador Gráfico",
  "Psicólogo",
  "Economista",
  "Community Manager",
  "Veterinario",
  "Traductor",
];

function TypewriterHero() {
  // El primer render server/client es idéntico; la profesión se elige tras hidratar.
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setPhraseIndex(Math.floor(Math.random() * PHRASES.length));
  }, []);

  useEffect(() => {
    const current = PHRASES[phraseIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) setCharIndex(charIndex + 1);
        else setTimeout(() => setDeleting(true), 2200);
      } else if (charIndex > 0) {
        setCharIndex(charIndex - 1);
      } else {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % PHRASES.length);
      }
    }, deleting ? 38 : 72);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div className="hero-title-wrap">
      <span className="hero-eyebrow">Tu próxima oportunidad empieza aquí</span>
      {/* Titular corto (6 palabras) y en una sola línea: qué hace, para quién
          y a qué precio. El texto SEO real va en sr-only y el typewriter es
          decorativo (aria-hidden). */}
      <h1 className="hero-title">
        <span className="sr-only">Generador de currículums gratis para profesionales</span>
        <span className="hero-title-line">Generador de CV gratis para</span>{" "}
        <span className="hero-title-gradient" aria-hidden="true">
          {PHRASES[phraseIndex].slice(0, charIndex)}
          <span className="hero-cursor" />
        </span>
      </h1>
    </div>
  );
}

function EditorPreview() {
  return (
    <div className="product-stage" aria-label="Vista animada del editor de currículums de CVMakerApp">
      <div className="stage-orb stage-orb-blue" />
      <div className="stage-orb stage-orb-pink" />
      <div className="editor-window">
        <div className="window-bar">
          <span className="window-dots"><i /><i /><i /></span>
          <span className="window-title">CVMakerApp · Editor</span>
          <span className="window-live"><b /> Vista en vivo</span>
        </div>
        <div className="editor-mock-grid">
          <div className="form-panel">
            <div className="mock-section-label">Datos personales</div>
            <label>Nombre completo</label>
            <div className="mock-input">María García López</div>
            <label>Título profesional</label>
            <div className="mock-input">Diseñadora de Producto</div>
            <label>Experiencia</label>
            <div className="mock-card-mini">
              <span>Senior Product Designer</span>
              <small>Stripe · 2022 — Presente</small>
              <i />
            </div>
            <div className="mock-section-label second">Habilidades</div>
            <div className="skill-pills"><span>Figma</span><span>React</span><span>UX</span></div>
          </div>
          <div className="preview-panel">
            <div className="preview-toolbar">
              <span><i /> Minimal</span>
              <div><b>Compartir</b><button>Exportar PDF</button></div>
            </div>
            <div className="resume-sheet">
              <div className="resume-accent" />
              <h3>María García López</h3>
              <p className="resume-role">Diseñadora de Producto</p>
              <div className="resume-contact">madrid@email.com · +34 612 345 678 · Madrid</div>
              <div className="resume-rule" />
              <small>PERFIL PROFESIONAL</small>
              <p className="resume-copy">Diseñadora de producto con más de 6 años de experiencia creando interfaces digitales claras, accesibles y centradas en el usuario.</p>
              <small>EXPERIENCIA</small>
              <strong>Senior Product Designer</strong>
              <em>Stripe · Ene 2022 — Presente</em>
              <div className="resume-lines"><i /><i /><i /></div>
              <strong>Product Designer</strong>
              <em>Typeform · Mar 2019 — Dic 2021</em>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-chip chip-pdf"><span>↓</span> PDF listo</div>
      <div className="floating-chip chip-live"><span>●</span> En vivo</div>
    </div>
  );
}

export default function HomeClient() {
  return (
    <main className="premium-site">
      <div className="ambient-glow ambient-glow-one" />
      <div className="ambient-glow ambient-glow-two" />

      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="brand-mark" aria-label="CVMakerApp, inicio">
            <span className="brand-symbol">C</span>
            <span>CVMakerApp</span>
          </Link>
          <nav className="site-nav" aria-label="Navegación principal">
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#comparativa">Comparativa</a>
            <a href="#precios">Precio</a>
            <a href="#faq">FAQ</a>
          </nav>
          <Link className="button button-primary button-small" href="/editor">Crear mi CV</Link>
        </div>
      </header>

      <section className="hero-section">
        <TypewriterHero />
        <p className="hero-description">Escribe tu información, elige entre 20 plantillas y descarga un CV profesional. Sin registro, sin marca de agua y sin esperas.</p>
        {/* Un único CTA principal above the fold, con el precio visible justo
            encima. El enlace a "cómo funciona" es texto, no otro botón, para
            que no compita con la acción principal. */}
        <div className="hero-actions">
          <span className="price-badge"><b>Gratis</b> 0 € · sin tarjeta · sin registro</span>
          <Link className="button button-primary" href="/editor">Crear mi CV gratis <span>→</span></Link>
          <a className="hero-sublink" href="#como-funciona">Ver cómo funciona ↓</a>
        </div>
        <div className="hero-trust">
          <span><b>✓</b> 100 % privado</span>
          <span><b>✓</b> Sin registro</span>
          <span><b>✓</b> PDF sin marca de agua</span>
        </div>
        <EditorPreview />
      </section>

      <section id="como-funciona" className="content-section steps-section">
        <div className="section-heading centered">
          <span className="section-kicker">Así de fácil</span>
          <h2>Tu CV, listo en minutos</h2>
          <p>Todo lo que necesitas para crear un currículum profesional y enviable.</p>
        </div>
        <div className="steps-grid">
          {[
            { step: "01", title: "Elige tu diseño", desc: "Explora 20 plantillas profesionales y encuentra el estilo que mejor representa tu perfil.", tone: "blue" },
            { step: "02", title: "Escribe tu información", desc: "Completa tu experiencia, formación y habilidades. La vista previa cambia al instante.", tone: "violet" },
            { step: "03", title: "Descarga y comparte", desc: "Exporta a PDF, imprime o comparte tu CV mediante un enlace. Todo desde tu navegador.", tone: "pink" },
          ].map((item) => (
            <article className="step-card" key={item.step}>
              <span className={`step-number ${item.tone}`}>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="comparativa" className="content-section comparison-section">
        <div className="section-heading centered">
          <span className="section-kicker">Una diferencia clara</span>
          <h2>Más libertad para crear</h2>
          <p>Una herramienta completa, privada y gratuita desde el primer momento.</p>
        </div>
        <div className="comparison-card">
          <div className="comparison-row comparison-head">
            <span />
            <strong><i className="mini-logo">C</i> CVMakerApp</strong>
            <span>Otras herramientas</span>
          </div>
          {COMPARISON.map((row, index) => (
            <div className="comparison-row" key={row.feature}>
              <span className="feature-name">{row.feature}</span>
              <strong className="feature-us"><b>✓</b> {row.us}</strong>
              <span className="feature-them">{row.them}</span>
              {index === 0 && <span className="comparison-ribbon">Recomendado</span>}
            </div>
          ))}
        </div>
      </section>

      <section id="precios" className="content-section pricing-section">
        <div className="section-heading centered">
          <span className="section-kicker">Precio</span>
          <h2>Gratis, y sin letra pequeña</h2>
          <p>Un único plan para todo el producto. No hay versión de pago, ni prueba que se agote, ni funciones bloqueadas.</p>
        </div>
        <div className="pricing-card">
          <span className="pricing-tag">Plan único</span>
          <p className="pricing-amount"><b>0 €</b><span>para siempre</span></p>
          <p className="pricing-summary">Todo el editor, las 20 plantillas y la exportación a PDF sin marca de agua.</p>
          <ul className="pricing-features">
            {[
              "20 plantillas de currículum",
              "Vista previa en vivo mientras escribes",
              "PDF A4 e impresión sin marca de agua",
              "Compartir por enlace, sin subir nada a un servidor",
              "Vista ATS para sistemas de seguimiento",
              "Sin registro, sin cookies, sin anuncios",
            ].map((feature) => (
              <li key={feature}><b>✓</b> {feature}</li>
            ))}
          </ul>
          <Link className="button button-primary" href="/editor">Crear mi CV gratis <span>→</span></Link>
          <p className="pricing-note">No pedimos tarjeta, ni email, ni registro para usar nada de esto.</p>
        </div>
      </section>

      <section id="testimonios" className="content-section testimonials-section">
        <div className="section-heading centered">
          <span className="section-kicker">Testimonios</span>
          <h2>Lo que dicen quienes ya lo han usado</h2>
          <p>Aún no hay testimonios publicados: este bloque se rellenará con citas reales en cuanto lleguen.</p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, index) => (
            <figure className="testimonial-card" key={index}>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="faq" className="content-section faq-section">
        <div className="section-heading centered">
          <span className="section-kicker">Preguntas frecuentes</span>
          <h2>Todo lo que necesitas saber</h2>
          <p>Respuestas claras antes de empezar a crear tu currículum.</p>
        </div>
        <div className="faq-list">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary><span>{item.q}</span><b>+</b></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-orb" />
        <span className="section-kicker">Tu próxima oportunidad no espera</span>
        <h2>Da el primer paso.<br />Tu próximo CV empieza aquí.</h2>
        <p>Gratis, rápido y sin registro. Ya puedes empezar.</p>
        <Link className="button button-light" href="/editor">Crear mi CV ahora <span>→</span></Link>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-symbol">C</span><strong>CVMakerApp</strong></div>
        <p>© {new Date().getFullYear()} CVMakerApp · Currículums profesionales en minutos.</p>
        <div className="footer-contact">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">Código fuente</a>
        </div>
        <div className="footer-links">
          <Link href="/acerca-de">Sobre mí</Link>
          <Link href="/politica-privacidad">Privacidad</Link>
          <Link href="/politica-cookies">Cookies</Link>
        </div>
      </footer>
    </main>
  );
}

// TODO PRUEBA SOCIAL: no hay testimonios reales todavía. Rellena TESTIMONIALS
// con citas reales (texto, nombre, puesto · empresa) en cuanto los recibas y
// borra los `[TESTIMONIAL PENDIENTE]`. No inventes cifras ni contadores de
// usuarios: la web no tiene analítica, así que no hay ningún número real que
// pueda mostrarse aquí.
const TESTIMONIALS = [
  { quote: "[TESTIMONIAL PENDIENTE]", author: "[TESTIMONIAL PENDIENTE]", role: "Puesto · Empresa" },
  { quote: "[TESTIMONIAL PENDIENTE]", author: "[TESTIMONIAL PENDIENTE]", role: "Puesto · Empresa" },
  { quote: "[TESTIMONIAL PENDIENTE]", author: "[TESTIMONIAL PENDIENTE]", role: "Puesto · Empresa" },
];

// TODO CONTACTO: sustituye este email por el buzón real de contacto antes de
// publicar (aparece en el footer de la landing y en /acerca-de).
const CONTACT_EMAIL = "hola@cvmakerapp.com";

const REPO_URL = "https://github.com/TirsoCode/cvmakerapp";

const COMPARISON = [
  { feature: "Precio", us: "Gratis para siempre", them: "Suscripción mensual" },
  { feature: "Registro", us: "Ninguno", them: "Obligatorio" },
  { feature: "Exportar PDF", us: "Sin marca de agua", them: "A menudo de pago" },
  { feature: "Tus datos", us: "Solo en tu navegador", them: "En sus servidores" },
  { feature: "Primer CV", us: "En minutos", them: "Horas de configuración" },
];
