import { type ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  style?: React.CSSProperties;
}

export default function MinimalTemplate({ data, style }: Props) {
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  return (
    <div style={{ fontFamily: "'Instrument Sans', system-ui, sans-serif", color: "#1A1918", background: "#fff", padding: "48px 56px", ...style }}>
      {/* Header */}
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px", color: "#1A1918" }}>
          {personal.name || "Tu Nombre"}
        </h1>
        <p style={{ fontSize: 14, color: accentColor, fontWeight: 500, margin: "0 0 16px" }}>
          {personal.title}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 12, color: "#6B6860" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4843", margin: 0 }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 16px" }}>
            Experiencia
          </h2>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{item.position}</h3>
                <span style={{ fontSize: 11, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", marginLeft: 12 }}>
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              <p style={{ fontSize: 12, fontWeight: 500, color: accentColor, margin: "0 0 6px" }}>{item.company}</p>
              <p style={{ fontSize: 12, lineHeight: 1.6, color: "#4A4843", margin: 0 }}>{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 16px" }}>
            Educación
          </h2>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{item.degree}</h3>
                <span style={{ fontSize: 11, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", marginLeft: 12 }}>
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#6B6860", margin: "2px 0 0" }}>{item.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 12px" }}>
            Habilidades
          </h2>
          {skills.map((cat) => (
            <div key={cat.id} style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#6B6860" }}>{cat.category}: </span>
              <span style={{ fontSize: 11, color: "#4A4843" }}>{cat.items.join(", ")}</span>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 12px" }}>
            Idiomas
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
            {languages.map((l) => (
              <span key={l.id} style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 500 }}>{l.language}</span>
                <span style={{ color: "#9C9890", marginLeft: 4 }}>{l.level}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C9890", margin: "0 0 12px" }}>
            Proyectos
          </h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, margin: "0 0 2px" }}>{p.name}</h3>
              <p style={{ fontSize: 11, color: "#4A4843", margin: "0 0 2px" }}>{p.description}</p>
              {p.url && <p style={{ fontSize: 11, color: accentColor, margin: 0 }}>{p.url}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
