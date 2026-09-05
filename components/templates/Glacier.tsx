import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function GlacierTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  const p4048 = `${Math.round(40*s)}px ${Math.round(48*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p26 = `${Math.round(26*s)}px`;
  const p24 = `${Math.round(24*s)}px`;
  const p18 = `${Math.round(18*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p416 = `${Math.round(4*s)}px ${Math.round(16*s)}px`;

  return (
    <div style={{ fontFamily: "'Instrument Sans', system-ui", color: "#1A1918", background: "#F0F9FF", padding: p4048 }}>
      <header style={{ marginBottom: p32, borderBottom: `1px solid #BAE6FD` }}>
        <h1 style={{ fontSize: 28*s, fontWeight: 800, letterSpacing: "-0.03em", margin: `0 0 ${4*s}px`, color: "#0C4A6E" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 12*s, color: accentColor, fontWeight: 600, margin: `0 0 ${14*s}px` }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#0369A1" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p26 }}><p style={{ fontSize: 12*s, lineHeight: 1.75, color: "#0C4A6E", margin: 0 }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10*s, marginBottom: p14 }}><span style={{ display: "block", width: 24*s, height: 2*s, background: accentColor, borderRadius: 1 }} /><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0369A1", margin: 0 }}>Experiencia</h2></div>
        {experience.map((item) => (
          <div key={item.id} style={{ marginBottom: p18 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 13*s, fontWeight: 700, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#0369A1" }}>{item.startDate} — {item.endDate}</span></div>
            <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: `${2*s}px 0 ${4*s}px` }}>{item.company}</p>
            <p style={{ fontSize: 11*s, lineHeight: 1.65, color: "#0C4A6E", margin: 0 }}>{item.description}</p>
          </div>))}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10*s, marginBottom: p14 }}><span style={{ display: "block", width: 24*s, height: 2*s, background: accentColor, borderRadius: 1 }} /><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0369A1", margin: 0 }}>Educación</h2></div>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#0369A1" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#0369A1", margin: `${2*s}px 0 0` }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${p32}` }}>
        {data.settings.sections.skills && skills.length > 0 && <section><div style={{ display: "flex", alignItems: "center", gap: 10*s, marginBottom: p12 }}><span style={{ display: "block", width: 24*s, height: 2*s, background: accentColor, borderRadius: 1 }} /><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0369A1", margin: 0 }}>Habilidades</h2></div>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#0369A1" }}>{cat.category} — </span><span style={{ fontSize: 11*s, color: "#0C4A6E" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>
          {data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: `${20*s}px` }}><div style={{ display: "flex", alignItems: "center", gap: 10*s, marginBottom: p12 }}><span style={{ display: "block", width: 24*s, height: 2*s, background: accentColor, borderRadius: 1 }} /><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0369A1", margin: 0 }}>Idiomas</h2></div>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 700 }}>{l.language}</span> <span style={{ color: "#0369A1" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><div style={{ display: "flex", alignItems: "center", gap: 10*s, marginBottom: p12 }}><span style={{ display: "block", width: 24*s, height: 2*s, background: accentColor, borderRadius: 1 }} /><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#0369A1", margin: 0 }}>Proyectos</h2></div>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${2*s}px` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#0C4A6E", margin: 0 }}>{p.description}</p></div>)}</section>}
        </div>
      </div>
    </div>
  );
}