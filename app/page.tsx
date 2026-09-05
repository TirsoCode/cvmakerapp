import Link from "next/link";
import { TEMPLATES } from "@/lib/types";

export default function Home() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #E4E2DC", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill="#1A1918"/>
              <text x="16" y="22" textAnchor="middle" fontSize="17" fill="white" fontFamily="serif" fontWeight="700">R</text>
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
              ResumeCraft
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
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "80px 24px 64px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 58px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 20px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
          Tu curriculum,<br />diseñado para impresionar
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: "#6B6860", maxWidth: 520, margin: "0 auto 36px", fontFamily: "'Instrument Sans', sans-serif" }}>
          Elige una plantilla, completa tus datos y descarga un PDF profesional en minutos. Sin registro, sin tracking.
        </p>
        <Link
          href="/editor"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 32px",
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
          </svg>
          Empezar ahora — es gratis
        </Link>
      </section>

      {/* Templates */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
            4 plantillas exclusivas
          </h2>
          <p style={{ fontSize: 15, color: "#6B6860", fontFamily: "'Instrument Sans', sans-serif" }}>
            Cada una con personalidad propia, diseñada para diferentes industrias
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {TEMPLATES.map((t) => (
            <div
              key={t.id}
              style={{
                background: "#fff",
                border: "1px solid #E4E2DC",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              {/* Preview */}
              <div style={{ height: 200, background: "#FAFAF8", padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TemplateThumbnail id={t.id} accent={t.accent} />
              </div>
              {/* Info */}
              <div style={{ padding: "16px 20px", borderTop: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
                  <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1A1918", fontFamily: "'Instrument Sans', sans-serif" }}>
                    {t.name}
                  </h3>
                </div>
                <p style={{ fontSize: 12, color: "#9C9890", margin: 0, fontFamily: "'Instrument Sans', sans-serif" }}>
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#fff", borderTop: "1px solid #E4E2DC", borderBottom: "1px solid #E4E2DC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
              title: "Sin registro",
              desc: "Abre la página y empieza. No necesitas cuenta ni email.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              ),
              title: "Exporta a PDF",
              desc: "Descarga tu CV en PDF listo para enviar a cualquier empresa.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              title: "Tus datos son tuyos",
              desc: "Todo se guarda en tu navegador. No hay servidores, no hay tracking.",
            },
          ].map((f) => (
            <div key={f.title} style={{ textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "#1A1918", fontFamily: "'Instrument Sans', sans-serif" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "#6B6860", margin: 0, lineHeight: 1.55, fontFamily: "'Instrument Sans', sans-serif" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 600, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>
          Tu próxima oportunidad empieza aquí
        </h2>
        <p style={{ fontSize: 15, color: "#6B6860", margin: "0 0 28px", fontFamily: "'Instrument Sans', sans-serif" }}>
          No esperes a tener el CV perfecto. Empieza con lo que tienes.
        </p>
        <Link
          href="/editor"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 32px",
            background: "#1A1918",
            color: "#fff",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: "none",
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          Ir al editor
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
          </svg>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E4E2DC", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#9C9890", margin: 0, fontFamily: "'Instrument Sans', sans-serif" }}>
          © {new Date().getFullYear()} ResumeCraft — Sin backend, sin tracking
        </p>
      </footer>
    </main>
  );
}

function TemplateThumbnail({ id, accent }: { id: string; accent: string }) {
  const scale = 0.38;
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
