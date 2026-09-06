import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function OpusTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
  const { accentColor } = data.settings;

  const p4048 = `${Math.round(40*s)}px ${Math.round(48*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p28 = `${Math.round(28*s)}px`;
  const p20 = `${Math.round(20*s)}px`;
  const p18 = `${Math.round(18*s)}px`;
  const p16 = `${Math.round(16*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p6 = `${Math.round(6*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p3 = `${Math.round(3*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p416 = `${Math.round(4*s)}px ${Math.round(16*s)}px`;
  const p004 = `0 0 ${p4}`;
  const p0012 = `0 0 ${p12}`;
  const p0014 = `0 0 ${p14}`;
  const p0016 = `0 0 ${p16}`;
  const p30_5 = `${p3} 0 ${5*s}px`;
  const p20_0_4 = `${p2} 0 ${p4}`;
  const p20_0_0 = `${p2} 0 0`;
  const p20_px = `${p20}`;
  const p300_5 = `${3*s}px 0 ${5*s}px`;

  return (
    <div style={{ fontFamily: "'Fraunces', Georgia, serif", color: "#1A1918", background: "#FEFCE8", padding: p4048 }}>
      <header style={{ marginBottom: p32, borderBottom: `1px solid #CA8A04` }}>
        <h1 style={{ fontSize: 28*s, fontWeight: 700, letterSpacing: "-0.02em", margin: p004, color: "#713F12" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: accentColor, fontWeight: 600, margin: p0014 }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#A16207" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p28 }}><p style={{ fontSize: 12*s, lineHeight: 1.8, color: "#854D0E", margin: 0, fontStyle: "italic" }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p28 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p16}` }}>Experiencia</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p18 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 14*s, fontWeight: 600, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#A16207" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: p300_5 }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.7, color: "#854D0E", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p28 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p16}` }}>Educación</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 600, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#A16207" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#A16207", margin: p20_0_0 }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${p32}` }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: p0012 }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#A16207" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#854D0E" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>
          {data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: p20_px }}><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: p0012 }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 700 }}>{l.language}</span> <span style={{ color: "#A16207" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: p0012 }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${p2}` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#854D0E", margin: 0 }}>{p.description}</p></div>)}</section>}
        </div>
      </div>
    </div>
  );
}