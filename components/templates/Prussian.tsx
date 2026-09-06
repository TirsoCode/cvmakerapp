import { type ResumeData, SPACING_MAP } from "@/lib/types";

interface Props { data: ResumeData; }

export default function PrussianTemplate({ data }: Props) {
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
  const p6 = `${Math.round(6*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p416 = `${Math.round(4*s)}px ${Math.round(16*s)}px`;
  const p004 = `0 0 ${p4}`;
  const p0012 = `0 0 ${p12}`;
  const p20_0_0 = `${p2} 0 0`;
  const p002 = `0 0 ${p2}`;
  const p0_32 = `0px ${p32}`;

  const SectionHeading = (t: string, fs: number, mb = 10) => (
    <h2 style={{ fontSize: fs, fontWeight: 700, color: accentColor, margin: `0 0 ${mb}px`, letterSpacing: "-0.01em" }}>{t}</h2>
  );

  return (
    <div style={{ fontFamily: "var(--font-instrument), system-ui", color: "#1A1918", background: "#fff", padding: p3644 }}>
      <header style={{ marginBottom: p28, paddingBottom: p20, borderBottom: `2px solid ${accentColor}` }}>
        <h1 style={{ fontSize: 26*s, fontWeight: 800, letterSpacing: "-0.03em", margin: p004, color: "#1A1918", textTransform: "uppercase" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 12*s, color: accentColor, fontWeight: 600, margin: p0012, letterSpacing: "0.06em", textTransform: "uppercase" }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p416, fontSize: 11*s, color: "#6B6860" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </header>
      {data.settings.sections.summary && summary && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p12}`, letterSpacing: "-0.01em" }}>Perfil Profesional</h2>
        <p style={{ fontSize: 12*s, lineHeight: 1.7, color: "#4A4843", margin: 0 }}>{summary}</p>
      </section>}
      {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Experiencia</h2>
        {experience.map((item) => (
          <div key={item.id} style={{ marginBottom: p16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: p2 }}>
              <h3 style={{ fontSize: 13*s, fontWeight: 700, margin: 0 }}>{item.position}</h3>
              <span style={{ fontSize: 10*s, fontFamily: "var(--font-jetbrains), monospace", color: "#9C9890" }}>{item.startDate} — {item.endDate}</span>
            </div>
            <p style={{ fontSize: 11*s, color: accentColor, fontWeight: 600, margin: p004 }}>{item.company}</p>
            <p style={{ fontSize: 11*s, lineHeight: 1.6, color: "#4A4843", margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </section>}
      {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Educación</h2>
        {education.map((item) => (
          <div key={item.id} style={{ marginBottom: p10 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0 }}>{item.degree}</h3>
              <span style={{ fontSize: 10*s, fontFamily: "var(--font-jetbrains), monospace", color: "#9C9890" }}>{item.startDate} — {item.endDate}</span>
            </div>
            <p style={{ fontSize: 11*s, color: "#6B6860", margin: p20_0_0 }}>{item.institution}</p>
          </div>
        ))}
      </section>}
      {data.settings.sections.skills && skills.length > 0 && <section style={{ marginBottom: p24 }}>
        <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Habilidades</h2>
        {skills.map((cat) => (
          <div key={cat.id} style={{ marginBottom: p6 }}>
            <span style={{ fontSize: 11*s, fontWeight: 600, color: "#6B6860" }}>{cat.category}: </span>
            <span style={{ fontSize: 11*s, color: "#4A4843" }}>{cat.items.join(", ")}</span>
          </div>
        ))}
      </section>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: p0_32 }}>
        {data.settings.sections.languages && languages.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Idiomas</h2>
          {languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 600 }}>{l.language}</span> <span style={{ color: "#9C9890" }}>{l.level}</span></div>)}
        </section>}
        {data.settings.sections.projects && projects.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Proyectos</h2>
          {projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: p002 }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{p.description}</p>{p.url && <p style={{ fontSize: 10*s, color: accentColor, margin: p20_0_0 }}>{p.url}</p>}</div>)}
        </section>}
        {certifications.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Certifications</h2>
          {certifications.map((item) => <div key={item.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: p002 }}>{item.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{item.issuer} {item.date && `• ${item.date}`}</p></div>)}
        </section>}
        {awards.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Awards</h2>
          {awards.map((item) => <div key={item.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: p002 }}>{item.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{item.issuer} {item.date && `• ${item.date}`}</p></div>)}
        </section>}
        {licenses.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Licenses</h2>
          {licenses.map((item) => <div key={item.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: p002 }}>{item.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{item.issuer} {item.licenseNumber && `• ${item.licenseNumber}`} {item.date && `• ${item.date}`}</p></div>)}
        </section>}
        {references.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>References</h2>
          {references.map((item) => <div key={item.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: p002 }}>{item.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{item.company} {item.relationship && `• ${item.relationship}`}</p><p style={{ fontSize: 10*s, color: "#6B6860", margin: p20_0_0 }}>{item.phone} {item.email && `• ${item.email}`}</p></div>)}
        </section>}
        {affiliations.length > 0 && <section>
          <h2 style={{ fontSize: 10*s, fontWeight: 700, color: accentColor, margin: `0 0 ${p10}`, letterSpacing: "-0.01em" }}>Affiliations</h2>
          {affiliations.map((item) => <div key={item.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: p002 }}>{item.organization}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{item.role} {item.startDate && `• ${item.startDate}`} {item.endDate && ` - ${item.endDate}`}</p></div>)}
        </section>}
      </div>
    </div>
  );
}