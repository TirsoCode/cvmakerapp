import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function EmberTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  const p3644 = `${Math.round(36*s)}px ${Math.round(44*s)}px`;
  const p28 = `${Math.round(28*s)}px`;
  const p24 = `${Math.round(24*s)}px`;
  const p18 = `${Math.round(18*s)}px`;
  const p16 = `${Math.round(16*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p416 = `${Math.round(4*s)}px ${Math.round(16*s)}px`;

  return (
    <div style={{ fontFamily: "'Instrument Sans', system-ui", color: "#1A1918", background: "#fff", padding: p3644 }}>
      <header style={{ marginBottom: p28, borderLeft: `4px solid ${accentColor}`, paddingLeft: p16 }}>
        <h1 style={{ fontSize: 26*s, fontWeight: 800, letterSpacing: "-0.03em", margin: `0 0 ${4*s}px`, color: "#1A1918" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: accentColor, fontWeight: 600, margin: `0 0 ${12*s}px` }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#6B6860" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p24, background: "#FFF7F5", padding: `${14*s}px ${p16}`, borderRadius: 8*s, borderLeft: `4px solid ${accentColor}` }}><p style={{ fontSize: 12*s, lineHeight: 1.75, color: "#4A4843", margin: 0 }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Experiencia</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p18, paddingBottom: p14, borderBottom: `1px solid #FEE2E2` }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 13*s, fontWeight: 700, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#9C9890" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: `${2*s}px 0 ${4*s}px` }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.65, color: "#4A4843", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Educación</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#9C9890" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#6B6860", margin: `${2*s}px 0 0` }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${32*s}px` }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#6B6860" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#4A4843" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>{data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: `${20*s}px` }}><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 600 }}>{l.language}</span> <span style={{ color: "#9C9890" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${2*s}px` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{p.description}</p></div>)}</section>}</div>
      </div>
    </div>
  );
}