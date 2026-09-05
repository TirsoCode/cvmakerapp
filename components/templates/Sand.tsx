import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function SandTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects } = data;
  const { accentColor } = data.settings;

  const p4048 = `${Math.round(40*s)}px ${Math.round(48*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p26 = `${Math.round(26*s)}px`;
  const p20 = `${Math.round(20*s)}px`;
  const p18 = `${Math.round(18*s)}px`;
  const p16 = `${Math.round(16*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p3 = `${Math.round(3*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p416 = `${Math.round(4*s)}px ${Math.round(16*s)}px`;
  const p004 = `0 0 ${p4}`;
  const p0012 = `0 0 ${p12}`;
  const p0014 = `0 0 ${p14}`;
  const p20_0_0 = `${p2} 0 0`;
  const p20_px = `${p20}`;
  const p300_5 = `${3*s}px 0 ${5*s}px`;
  const p0_32 = `0px ${p32}`;

  return (
    <div style={{ fontFamily: "'Instrument Sans', system-ui", color: "#1A1918", background: "#FBF9F4", padding: p4048 }}>
      <header style={{ marginBottom: p32 }}>
        <h1 style={{ fontSize: 28*s, fontWeight: 800, letterSpacing: "-0.03em", margin: p004, color: "#1A1918" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: accentColor, fontWeight: 600, margin: p0014 }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#92400E" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p26 }}><p style={{ fontSize: 12*s, lineHeight: 1.8, color: "#78350F", margin: 0 }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p26 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Experiencia</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p18 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 14*s, fontWeight: 700, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#B45309" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: p300_5 }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.7, color: "#78350F", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p26 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Educación</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#B45309" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#92400E", margin: p20_0_0 }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: p0_32 }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: p0012 }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#92400E" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#78350F" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>
          {data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: p20_px }}><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: p0012 }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 700 }}>{l.language}</span> <span style={{ color: "#B45309" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: p0012 }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#78350F", margin: 0 }}>{p.description}</p></div>)}</section>}
        </div>
      </div>
    </div>
  );
}