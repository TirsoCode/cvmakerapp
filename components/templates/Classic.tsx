import { type ResumeData } from "@/lib/types";

interface Props {
  data: ResumeData;
  style?: React.CSSProperties;
}

export default function ClassicTemplate({ data, style }: Props) {
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <span style={{ display: "block", height: 1, flex: 1, background: "#E4E2DC" }} />
      <h2 style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9C9890", margin: 0, whiteSpace: "nowrap" }}>
        {children}
      </h2>
      <span style={{ display: "block", height: 1, flex: 1, background: "#E4E2DC" }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: "#1A1918", background: "#fff", padding: "52px 56px", ...style }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.04em", margin: "0 0 6px", color: "#1A1918", textTransform: "uppercase" }}>
          {personal.name || "Tu Nombre"}
        </h1>
        <p style={{ fontSize: 12, color: accentColor, fontWeight: 600, margin: "0 0 12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {personal.title}
        </p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "4px 16px", fontSize: 11, color: "#6B6860" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: 24 }}>
          <SectionTitle>Perfil Profesional</SectionTitle>
          <p style={{ fontSize: 12, lineHeight: 1.75, color: "#4A4843", margin: 0, textAlign: "justify" }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <SectionTitle>Experiencia Profesional</SectionTitle>
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E4E2DC", paddingBottom: 4, marginBottom: 6 }}>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: "#1A1918" }}>{item.position}</h3>
                  <p style={{ fontSize: 11, color: accentColor, margin: "1px 0 0", fontWeight: 600 }}>{item.company}</p>
                </div>
                <span style={{ fontSize: 10, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", marginLeft: 12 }}>
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              <p style={{ fontSize: 11, lineHeight: 1.65, color: "#4A4843", margin: 0 }}>{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: 24 }}>
          <SectionTitle>Formación Académica</SectionTitle>
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #E4E2DC", paddingBottom: 4, marginBottom: 4 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "#1A1918" }}>{item.degree}</h3>
                <span style={{ fontSize: 10, color: "#9C9890", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", marginLeft: 12 }}>
                  {item.startDate} — {item.endDate}
                </span>
              </div>
              <p style={{ fontSize: 11, color: "#6B6860", margin: 0 }}>{item.institution}</p>
            </div>
          ))}
        </section>
      )}

      {/* Two columns at bottom */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 32px" }}>
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <SectionTitle>Habilidades</SectionTitle>
            {skills.map((cat) => (
              <div key={cat.id} style={{ marginBottom: 8 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#6B6860", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {cat.category}
                </p>
                <p style={{ fontSize: 11, color: "#4A4843", margin: 0, lineHeight: 1.5 }}>{cat.items.join(", ")}</p>
              </div>
            ))}
          </section>
        )}

        {/* Languages + Projects */}
        <div>
          {languages.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              <SectionTitle>Idiomas</SectionTitle>
              {languages.map((l) => (
                <div key={l.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "#4A4843" }}>{l.language}</span>
                  <span style={{ fontSize: 11, color: "#9C9890" }}>{l.level}</span>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <SectionTitle>Proyectos</SectionTitle>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: 8 }}>
                  <h3 style={{ fontSize: 11, fontWeight: 700, margin: "0 0 1px", color: "#1A1918" }}>{p.name}</h3>
                  <p style={{ fontSize: 10, color: "#4A4843", margin: "0 0 1px", lineHeight: 1.5 }}>{p.description}</p>
                  {p.url && <p style={{ fontSize: 10, color: accentColor, margin: 0 }}>{p.url}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
