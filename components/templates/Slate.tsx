import { type ResumeData, SPACING_MAP } from "@/lib/types";
interface Props { data: ResumeData; }
export default function SlateTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
  const { accentColor } = data.settings;

  const p3644 = `${Math.round(36*s)}px ${Math.round(44*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
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
  const p004 = `0 0 ${p4}`;
  const p0012 = `0 0 ${p12}`;
  const p20_0_4 = `${p2} 0 ${p4}`;
  const p20_0_0 = `${p2} 0 0`;
  const p0_32 = `0px ${p32}`;
  const p20_px = `${p20}`;
  const p14_px = `${p14}`;
  const p12_px = `${p12}`;
  const p10_px = `${p10}`;

  return (
    <div style={{ fontFamily: "var(--font-instrument), system-ui", color: "#1A1918", background: "#F8FAFC", padding: p3644 }}>
      <header style={{ marginBottom: p28, borderBottom: `2px solid ${accentColor}`, paddingBottom: p20 }}>
        <h1 style={{ fontSize: 26*s, fontWeight: 800, letterSpacing: "-0.03em", margin: p004, color: "#1E293B" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: accentColor, fontWeight: 600, margin: p0012 }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#64748B" }}>
          {personal.email && <span>{personal.email}</span>}{personal.phone && <span>{personal.phone}</span>}{personal.location && <span>{personal.location}</span>}{personal.linkedin && <span>{personal.linkedin}</span>}{personal.github && <span>{personal.github}</span>}{personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p24, background: "#fff", padding: p14_px, borderRadius: 8*s, border: `1px solid #E2E8F0` }}><p style={{ fontSize: 12*s, lineHeight: 1.7, color: "#475569", margin: 0 }}>{summary}</p></section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Experiencia</h2>
        {experience.map((item) => <div key={item.id} style={{ marginBottom: p16, background: "#fff", padding: p12_px, borderRadius: 8*s, border: `1px solid #E2E8F0` }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 13*s, fontWeight: 700, margin: 0 }}>{item.position}</h3><span style={{ fontSize: 10*s, fontFamily: "var(--font-jetbrains), monospace", color: "#94A3B8" }}>{item.startDate} — {item.endDate}</span></div>
          <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: p20_0_4 }}>{item.company}</p>
          <p style={{ fontSize: 11*s, lineHeight: 1.65, color: "#475569", margin: 0 }}>{item.description}</p>
        </div>)}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p14}` }}>Educación</h2>
        {education.map((item) => <div key={item.id} style={{ marginBottom: p10, background: "#fff", padding: p10_px, borderRadius: 8*s, border: `1px solid #E2E8F0` }}><div style={{ display: "flex", justifyContent: "space-between" }}><h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0 }}>{item.degree}</h3><span style={{ fontSize: 10*s, fontFamily: "var(--font-jetbrains), monospace", color: "#94A3B8" }}>{item.startDate} — {item.endDate}</span></div><p style={{ fontSize: 11*s, color: "#64748B", margin: p20_0_0 }}>{item.institution}</p></div>)}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: p0_32 }}>
        {data.settings.sections.skills && skills.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Habilidades</h2>{skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#475569" }}>{cat.category}: </span><span style={{ fontSize: 11*s, color: "#64748B" }}>{cat.items.join(", ")}</span></div>)}</section>}
        <div>
          {data.settings.sections.languages && languages.length > 0 && <section style={{ marginBottom: p20_px }}><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Idiomas</h2>{languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 700 }}>{l.language}</span> <span style={{ color: "#94A3B8" }}>{l.level}</span></div>)}</section>}
          {data.settings.sections.projects && projects.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Proyectos</h2>{projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{p.description}</p></div>)}</section>}
          {data.settings.sections.certifications && certifications.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Certificaciones</h2>{certifications.map((c) => <div key={c.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{c.name}</h3><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{c.issuer} — {c.date}</p></div>)}</section>}
          {data.settings.sections.awards && awards.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Premios</h2>{awards.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{a.name}</h3><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{a.issuer} — {a.date}</p></div>)}</section>}
          {data.settings.sections.licenses && licenses.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Licencias</h2>{licenses.map((l) => <div key={l.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{l.name}</h3><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{l.issuer} — {l.licenseNumber} — {l.date}</p></div>)}</section>}
          {data.settings.sections.references && references.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Referencias</h2>{references.map((r) => <div key={r.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{r.name}</h3><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{r.company} — {r.relationship}</p><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{r.phone} — {r.email}</p></div>)}</section>}
          {data.settings.sections.affiliations && affiliations.length > 0 && <section><h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: accentColor, margin: `0 0 ${p12}` }}>Afiliaciones</h2>{affiliations.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${p2}` }}>{a.organization}</h3><p style={{ fontSize: 10*s, color: "#64748B", margin: 0 }}>{a.role} — {a.startDate} — {a.endDate}</p></div>)}</section>}
        </div>
      </div>
    </div>
  );
}