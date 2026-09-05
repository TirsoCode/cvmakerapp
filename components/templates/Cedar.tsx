import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function CedarTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
  const { accentColor } = data.settings;

  const p4048 = `${Math.round(40*s)}px ${Math.round(48*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p28 = `${Math.round(28*s)}px`;
  const p24 = `${Math.round(24*s)}px`;
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

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#1A1918", background: "#FDFDF0", padding: p4048 }}>
      <header style={{ marginBottom: p32 }}>
        <h1 style={{ fontSize: 28*s, fontWeight: 700, letterSpacing: "-0.02em", margin: `0 0 ${4*s}px`, color: "#1F3A0A" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: accentColor, fontWeight: 600, margin: `0 0 ${14*s}px` }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#4D7C0F" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}{personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p28, borderLeft: `3px solid ${accentColor}`, paddingLeft: p16 }}><p style={{ fontSize: 12*s, lineHeight: 1.8, color: "#3D5A1A", margin: 0, fontStyle: "italic" }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p28 }}>
        <h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p16}` }}>Experiencia</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p18 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 14*s, fontWeight: 600, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#4D7C0F" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: `${3*s}px 0 ${5*s}px` }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.7, color: "#3D5A1A", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p28 }}>
        <h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p16}` }}>Educación</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 600, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#4D7C0F" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#4D7C0F", margin: `${2*s}px 0 0` }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${p32}` }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#4D7C0F" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#3D5A1A" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>{data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: `${20*s}px` }}><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 600 }}>{l.language}</span> <span style={{ color: "#4D7C0F" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{p.description}</p></div>)}</section>}
          {data.settings.sections.certifications && certifications.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Certificaciones</h2>{certifications.map((c) => <div key={c.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{c.name}</h3><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{c.issuer} — {c.date}</p></div>)}</section>}
          {data.settings.sections.awards && awards.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Premios</h2>{awards.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{a.name}</h3><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{a.issuer} — {a.date}</p></div>)}</section>}
          {data.settings.sections.licenses && licenses.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Licencias</h2>{licenses.map((l) => <div key={l.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{l.name}</h3><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{l.issuer} — {l.licenseNumber} — {l.date}</p></div>)}</section>}
          {data.settings.sections.references && references.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Referencias</h2>{references.map((r) => <div key={r.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{r.name}</h3><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{r.company} — {r.relationship}</p><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{r.phone} — {r.email}</p></div>)}</section>}
          {data.settings.sections.affiliations && affiliations.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Afiliaciones</h2>{affiliations.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{a.organization}</h3><p style={{ fontSize: 10*s, color: "#3D5A1A", margin: 0 }}>{a.role} — {a.startDate} — {a.endDate}</p></div>)}</section>}
        </div>
      </div>
    </div>
  );
}