import { type ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  style?: React.CSSProperties;
}

export default function EditorialTemplate({ data, style }: Props) {
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1A1918", background: "#fff", padding: "0", ...style }}>
      {/* Left sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
        <aside style={{ background: "#1A1918", color: "#F3F2EE", padding: "48px 28px", minHeight: "100%" }}>
          {/* Name in sidebar */}
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", margin: "0 0 6px", color: "#fff", lineHeight: 1.2 }}>
            {personal.name || "Tu Nombre"}
          </h1>
          <p style={{ fontSize: 11, color: accentColor, margin: "0 0 32px", fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>
            {personal.title}
          </p>

          {/* Contact */}
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6860", margin: "0 0 10px", fontFamily: "'Instrument Sans', sans-serif" }}>
              Contacto
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {personal.email && <span style={{ fontSize: 10, color: "#E4E2DC", fontFamily: "'Instrument Sans', sans-serif" }}>{personal.email}</span>}
              {personal.phone && <span style={{ fontSize: 10, color: "#E4E2DC", fontFamily: "'Instrument Sans', sans-serif" }}>{personal.phone}</span>}
              {personal.location && <span style={{ fontSize: 10, color: "#E4E2DC", fontFamily: "'Instrument Sans', sans-serif" }}>{personal.location}</span>}
              {personal.linkedin && <span style={{ fontSize: 10, color: "#E4E2DC", fontFamily: "'Instrument Sans', sans-serif" }}>{personal.linkedin}</span>}
              {personal.github && <span style={{ fontSize: 10, color: "#E4E2DC", fontFamily: "'Instrument Sans', sans-serif" }}>{personal.github}</span>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6860", margin: "0 0 10px", fontFamily: "'Instrument Sans', sans-serif" }}>
                Habilidades
              </h3>
              {skills.map((cat) => (
                <div key={cat.id} style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 600, color: "#9C9890", margin: "0 0 4px", fontFamily: "'Instrument Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {cat.category}
                  </p>
                  <p style={{ fontSize: 10, color: "#E4E2DC", lineHeight: 1.5, fontFamily: "'Instrument Sans', sans-serif" }}>
                    {cat.items.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6860", margin: "0 0 10px", fontFamily: "'Instrument Sans', sans-serif" }}>
                Idiomas
              </h3>
              {languages.map((l) => (
                <div key={l.id} style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "#E4E2DC", fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>{l.language}</span>
                  <span style={{ fontSize: 10, color: "#6B6860", marginLeft: 6, fontFamily: "'Instrument Sans', sans-serif" }}>{l.level}</span>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Main content */}
        <main style={{ padding: "48px 44px" }}>
          {/* Summary */}
          {summary && (
            <section style={{ marginBottom: 36, borderLeft: `3px solid ${accentColor}`, paddingLeft: 20 }}>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "#4A4843", margin: 0, fontStyle: "italic" }}>{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accentColor, margin: "0 0 20px", fontFamily: "'Instrument Sans', sans-serif" }}>
                Experiencia Profesional
              </h2>
              {experience.map((item) => (
                <div key={item.id} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{item.position}</h3>
                    <span style={{ fontSize: 10, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", marginLeft: 12 }}>
                      {item.startDate} — {item.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: accentColor, margin: "0 0 8px", fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}>
                    {item.company}
                  </p>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: "#4A4843", margin: 0 }}>{item.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accentColor, margin: "0 0 20px", fontFamily: "'Instrument Sans', sans-serif" }}>
                Educación
              </h2>
              {education.map((item) => (
                <div key={item.id} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{item.degree}</h3>
                    <span style={{ fontSize: 10, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", marginLeft: 12 }}>
                      {item.startDate} — {item.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: "#6B6860", margin: "2px 0 0" }}>{item.institution}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section style={{ marginTop: 36 }}>
              <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: accentColor, margin: "0 0 16px", fontFamily: "'Instrument Sans', sans-serif" }}>
                Proyectos
              </h2>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 12 }}>
                  <h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 2px" }}>{p.name}</h3>
                  <p style={{ fontSize: 11, color: "#4A4843", margin: "0 0 2px" }}>{p.description}</p>
                  {p.url && <p style={{ fontSize: 10, color: accentColor, margin: 0 }}>{p.url}</p>}
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
