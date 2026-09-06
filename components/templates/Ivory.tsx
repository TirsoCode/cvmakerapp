import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function IvoryTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
  const { accentColor } = data.settings;

  const p4452 = `${Math.round(44*s)}px ${Math.round(52*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p28 = `${Math.round(28*s)}px`;
  const p18 = `${Math.round(18*s)}px`;
  const p16 = `${Math.round(16*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p6 = `${Math.round(6*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p420 = `${Math.round(4*s)}px ${Math.round(20*s)}px`;

  return (
    <div style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#44403C", background: "#FDFDFA", padding: p4452 }}>
      <header style={{ marginBottom: p32, textAlign: "center" }}>
        <h1 style={{ fontSize: 30*s, fontWeight: 700, letterSpacing: "-0.02em", margin: `0 0 ${6*s}px`, color: "#1C1917" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: accentColor, fontWeight: 600, margin: `0 0 ${16*s}px`, fontStyle: "italic" }}>{personal.title}</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: p420, fontSize: 11*s, color: "#78716C" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}{personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p28, borderTop: `1px solid #D6D3D1`, borderBottom: `1px solid #D6D3D1`, padding: `${16*s}px 0` }}>
        <p style={{ fontSize: 12*s, lineHeight: 1.8, color: "#57534E", margin: 0, textAlign: "justify" }}>{summary}</p>
      </section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p28 }}>
        <h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p16}`, textAlign: "center" }}>Experiencia Profesional</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dashed #D6D3D1`, paddingBottom: p4, marginBottom: p6 }}><h3 style={{ fontSize: 14*s, fontWeight: 600, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "var(--font-jetbrains), monospace", color: "#78716C" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: `0 0 ${p4}` }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.7, color: "#57534E", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p28 }}>
        <h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p16}`, textAlign: "center" }}>Formación Académica</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px dashed #D6D3D1`, paddingBottom: p4 }}><h3 style={{ fontSize: 12*s, fontWeight: 600, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "var(--font-jetbrains), monospace", color: "#78716C" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#78716C", margin: `${2*s}px 0 0` }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${p32}` }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#78716C" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#57534E" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>{data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: `${20*s}px` }}><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 600, color: "#57534E" }}>{l.language}</span><span style={{ color: "#78716C" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#57534E", margin: 0, lineHeight: 1.5 }}>{p.description}</p></div>)}</section>}
          {data.settings.sections.certifications && certifications.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Certificaciones</h2>{certifications.map((c) => <div key={c.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{c.name}</h3><p style={{ fontSize: 10*s, color: "#57534E", margin: 0 }}>{c.issuer} — {c.date}</p></div>)}</section>}
          {data.settings.sections.awards && awards.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Premios</h2>{awards.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{a.name}</h3><p style={{ fontSize: 10*s, color: "#57534E", margin: 0 }}>{a.issuer} — {a.date}</p></div>)}</section>}
          {data.settings.sections.licenses && licenses.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Licencias</h2>{licenses.map((l) => <div key={l.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{l.name}</h3><p style={{ fontSize: 10*s, color: "#57534E", margin: 0 }}>{l.issuer} — {l.licenseNumber} — {l.date}</p></div>)}</section>}
          {data.settings.sections.references && references.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Referencias</h2>{references.map((r) => <div key={r.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{r.name}</h3><p style={{ fontSize: 10*s, color: "#57534E", margin: 0 }}>{r.company} — {r.relationship}</p><p style={{ fontSize: 10*s, color: "#57534E", margin: 0 }}>{r.phone} — {r.email}</p></div>)}</section>}
          {data.settings.sections.affiliations && affiliations.length > 0 && <section><h2 style={{ fontSize: 11*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Afiliaciones</h2>{affiliations.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 600, margin: `0 0 ${2*s}px` }}>{a.organization}</h3><p style={{ fontSize: 10*s, color: "#57534E", margin: 0 }}>{a.role} — {a.startDate} — {a.endDate}</p></div>)}</section>}
        </div>
      </div>
    </div>
  );
}