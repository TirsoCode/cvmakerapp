import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function ObsidianTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
  const { accentColor } = data.settings;

  const p3644 = `${Math.round(36*s)}px ${Math.round(44*s)}px`;
  const p28 = `${Math.round(28*s)}px`;
  const p24 = `${Math.round(24*s)}px`;
  const p20 = `${Math.round(20*s)}px`;
  const p16 = `${Math.round(16*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p416 = `${Math.round(4*s)}px ${Math.round(16*s)}px`;

  return (
    <div style={{ fontFamily: "'Space Grotesk', system-ui", color: "#FAFAFA", background: "#18181B", padding: p3644 }}>
      <header style={{ marginBottom: p28, paddingBottom: p20, borderBottom: `1px solid #3F3F46` }}>
        <h1 style={{ fontSize: 26*s, fontWeight: 800, letterSpacing: "-0.03em", margin: `0 0 ${4*s}px`, color: "#FAFAFA" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 12*s, color: accentColor, fontWeight: 600, margin: `0 0 ${12*s}px` }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#A1A1AA" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}{personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p24 }}><p style={{ fontSize: 12*s, lineHeight: 1.75, color: "#D4D4D8", margin: 0 }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Experiencia</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p16 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 13*s, fontWeight: 700, margin: 0, color: "#FAFAFA" }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#71717A" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: `${2*s}px 0 ${4*s}px` }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.65, color: "#A1A1AA", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Educación</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0, color: "#FAFAFA" }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#71717A" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#71717A", margin: `${2*s}px 0 0` }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${32*s}px` }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 700, color: "#71717A" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#D4D4D8" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>{data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: `${20*s}px` }}><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 700, color: "#FAFAFA" }}>{l.language}</span> <span style={{ color: "#71717A" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${2*s}px`, color: "#FAFAFA" }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#A1A1AA", margin: 0 }}>{p.description}</p></div>)}</section>}</div>
      </div>
      {data.settings.sections.certifications && certifications.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Certificaciones</h2>
        {certifications.map((c) => <div key={c.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#FAFAFA" }}>{c.name}</span> <span style={{ fontSize: 10*s, color: "#71717A" }}>— {c.issuer} ({c.date})</span></div>)}
      </section>}
      {data.settings.sections.awards && awards.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Premios</h2>
        {awards.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#FAFAFA" }}>{a.name}</span> <span style={{ fontSize: 10*s, color: "#71717A" }}>— {a.issuer} ({a.date})</span></div>)}
      </section>}
      {data.settings.sections.licenses && licenses.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Licencias</h2>
        {licenses.map((l) => <div key={l.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#FAFAFA" }}>{l.name}</span> <span style={{ fontSize: 10*s, color: "#71717A" }}>— {l.issuer} ({l.licenseNumber})</span></div>)}
      </section>}
      {data.settings.sections.references && references.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Referencias</h2>
        {references.map((r) => <div key={r.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#FAFAFA" }}>{r.name}</span> <span style={{ fontSize: 10*s, color: "#71717A" }}>— {r.company} ({r.relationship})</span><br /><span style={{ fontSize: 10*s, color: "#71717A" }}>{r.email} | {r.phone}</span></div>)}
      </section>}
      {data.settings.sections.affiliations && affiliations.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Afiliaciones</h2>
        {affiliations.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#FAFAFA" }}>{a.organization}</span> <span style={{ fontSize: 10*s, color: "#71717A" }}>— {a.role} ({a.startDate} — {a.endDate})</span></div>)}
      </section>}
    </div>
  );
}