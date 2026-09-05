import { type ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  style?: React.CSSProperties;
}

export default function ModernTemplate({ data, style }: Props) {
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  return (
    <div style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif", color: "#1A1918", background: "#fff", padding: "0", ...style }}>
      {/* Header bar */}
      <div style={{ background: "#1A1918", padding: "36px 52px 32px" }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 6px", color: "#FFFFFF" }}>
          {personal.name || "Tu Nombre"}
        </h1>
        <p style={{ fontSize: 13, color: accentColor, fontWeight: 600, margin: "0 0 18px", letterSpacing: "0.02em" }}>
          {personal.title}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px", fontSize: 11, color: "#9C9890" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "36px 52px" }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: 30 }}>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#4A4843", margin: 0, borderLeft: `4px solid ${accentColor}`, paddingLeft: 16 }}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 20, height: 2, background: accentColor }} />
              Experiencia
            </h2>
            {experience.map((item) => (
              <div key={item.id} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1A1918" }}>{item.position}</h3>
                    <p style={{ fontSize: 12, color: accentColor, fontWeight: 600, margin: "2px 0 0" }}>{item.company}</p>
                  </div>
                  <span style={{ fontSize: 10, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", marginLeft: 16, marginTop: 2 }}>
                    {item.startDate} — {item.endDate}
                  </span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.65, color: "#4A4843", margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education + Skills in 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
          {education.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "block", width: 16, height: 2, background: accentColor }} />
                Educación
              </h2>
              {education.map((item) => (
                <div key={item.id} style={{ marginBottom: 12 }}>
                  <h3 style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "#1A1918" }}>{item.degree}</h3>
                  <p style={{ fontSize: 11, color: "#6B6860", margin: "1px 0 0" }}>{item.institution}</p>
                  <p style={{ fontSize: 10, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", margin: "2px 0 0" }}>
                    {item.startDate} — {item.endDate}
                  </p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "block", width: 16, height: 2, background: accentColor }} />
                Habilidades
              </h2>
              {skills.map((cat) => (
                <div key={cat.id} style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#6B6860", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {cat.category}
                  </span>
                  <p style={{ fontSize: 11, color: "#4A4843", margin: "2px 0 0", lineHeight: 1.5 }}>{cat.items.join(", ")}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 16, height: 2, background: accentColor }} />
              Idiomas
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
              {languages.map((l) => (
                <span key={l.id} style={{ fontSize: 12 }}>
                  <span style={{ fontWeight: 700, color: "#1A1918" }}>{l.language}</span>
                  <span style={{ color: "#9C9890", marginLeft: 6 }}>{l.level}</span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "block", width: 16, height: 2, background: accentColor }} />
              Proyectos
            </h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: 10 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, margin: "0 0 2px", color: "#1A1918" }}>{p.name}</h3>
                <p style={{ fontSize: 11, color: "#4A4843", margin: "0 0 2px" }}>{p.description}</p>
                {p.url && <p style={{ fontSize: 10, color: accentColor, margin: 0 }}>{p.url}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
