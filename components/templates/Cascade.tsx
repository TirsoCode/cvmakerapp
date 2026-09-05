import { type ResumeData, SPACING_MAP } from "@/lib/types";

interface Props { data: ResumeData; }

export default function CascadeTemplate({ data }: Props) {
  const s = SPACING_MAP[data.settings.spacing];
  const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
  const { accentColor } = data.settings;

  const p3228 = `${Math.round(32*s)}px ${Math.round(48*s)}px ${Math.round(28*s)}px`;
  const p3248 = `${Math.round(32*s)}px ${Math.round(48*s)}px`;
  const p26 = `${Math.round(26*s)}px`;
  const p16 = `${Math.round(16*s)}px`;
  const p14 = `${Math.round(14*s)}px`;
  const p12 = `${Math.round(12*s)}px`;
  const p10 = `${Math.round(10*s)}px`;
  const p4 = `${Math.round(4*s)}px`;
  const p2 = `${Math.round(2*s)}px`;
  const p8 = `${Math.round(8*s)}px`;
  const p40 = `${Math.round(40*s)}px`;
  const p3 = `${Math.round(3*s)}px`;
  const p24 = `${Math.round(24*s)}px`;
  const p32 = `${Math.round(32*s)}px`;
  const p420 = `${Math.round(4*s)}px ${Math.round(20*s)}px`;

  return (
    <div style={{ fontFamily: "'Instrument Sans', system-ui", color: "#1A1918", background: "#fff", padding: "0" }}>
      <div style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}88 100%)`, padding: p3228 }}>
        <h1 style={{ fontSize: 28*s, fontWeight: 800, letterSpacing: "-0.03em", margin: `0 0 ${4*s}px`, color: "#fff" }}>{personal.name || "Nombre"}</h1>
        <p style={{ fontSize: 13*s, color: "rgba(255,255,255,0.85)", margin: `0 0 ${14*s}px`, fontWeight: 500 }}>{personal.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: p420, fontSize: 11*s, color: "rgba(255,255,255,0.7)" }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.portfolio && <span>{personal.portfolio}</span>}
        </div>
      </div>
      <div style={{ padding: p3248 }}>
        {data.settings.sections.summary && summary && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <p style={{ fontSize: 12*s, lineHeight: 1.75, color: "#4A4843", margin: 0 }}>{summary}</p>
        </section>}
        {data.settings.sections.experience && experience.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p14 }} />
          {experience.map((item) => (
            <div key={item.id} style={{ marginBottom: p16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: p2 }}>
                <div><h3 style={{ fontSize: 14*s, fontWeight: 700, margin: 0 }}>{item.position}</h3><p style={{ fontSize: 12*s, color: accentColor, fontWeight: 600, margin: `${2*s}px 0 0` }}>{item.company}</p></div>
                <span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#9C9890", whiteSpace: "nowrap", marginLeft: 12*s }}>{item.startDate} — {item.endDate}</span>
              </div>
              <p style={{ fontSize: 11*s, lineHeight: 1.65, color: "#4A4843", margin: 0 }}>{item.description}</p>
            </div>
          ))}
        </section>}
        {data.settings.sections.education && education.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p14 }} />
          {education.map((item) => (
            <div key={item.id} style={{ marginBottom: p10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ fontSize: 12*s, fontWeight: 700, margin: 0 }}>{item.degree}</h3>
                <span style={{ fontSize: 10*s, fontFamily: "'JetBrains Mono', monospace", color: "#9C9890" }}>{item.startDate} — {item.endDate}</span>
              </div>
              <p style={{ fontSize: 11*s, color: "#6B6860", margin: `${2*s}px 0 0` }}>{item.institution}</p>
            </div>
          ))}
        </section>}
        {data.settings.sections.skills && skills.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${p24}` }}>
            {skills.map((cat) => <div key={cat.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 10*s, fontWeight: 700, color: "#6B6860", textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat.category}</span><p style={{ fontSize: 11*s, color: "#4A4843", margin: `${3*s}px 0 0`, lineHeight: 1.5 }}>{cat.items.join(", ")}</p></div>)}
          </div>
        </section>}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `0px ${p32}` }}>
          {data.settings.sections.languages && languages.length > 0 && <section>
            <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
            {languages.map((l) => <div key={l.id} style={{ fontSize: 11*s, marginBottom: p4 }}><span style={{ fontWeight: 600 }}>{l.language}</span> <span style={{ color: "#9C9890" }}>{l.level}</span></div>)}
          </section>}
          {data.settings.sections.projects && projects.length > 0 && <section>
            <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
            {projects.map((p) => <div key={p.id} style={{ marginBottom: p8 }}><h3 style={{ fontSize: 11*s, fontWeight: 700, margin: `0 0 ${2*s}px` }}>{p.name}</h3><p style={{ fontSize: 10*s, color: "#4A4843", margin: 0 }}>{p.description}</p></div>)}
          </section>}
        </div>
        {data.settings.sections.certifications && certifications.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6B6860", margin: `0 0 ${p12}` }}>Certificaciones</h2>
          {certifications.map((c) => <div key={c.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#4A4843" }}>{c.name}</span> <span style={{ fontSize: 10*s, color: "#9C9890" }}>— {c.issuer} ({c.date})</span></div>)}
        </section>}
        {data.settings.sections.awards && awards.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6B6860", margin: `0 0 ${p12}` }}>Premios</h2>
          {awards.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#4A4843" }}>{a.name}</span> <span style={{ fontSize: 10*s, color: "#9C9890" }}>— {a.issuer} ({a.date})</span></div>)}
        </section>}
        {data.settings.sections.licenses && licenses.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6B6860", margin: `0 0 ${p12}` }}>Licencias</h2>
          {licenses.map((l) => <div key={l.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#4A4843" }}>{l.name}</span> <span style={{ fontSize: 10*s, color: "#9C9890" }}>— {l.issuer} ({l.licenseNumber})</span></div>)}
        </section>}
        {data.settings.sections.references && references.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6B6860", margin: `0 0 ${p12}` }}>Referencias</h2>
          {references.map((r) => <div key={r.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#4A4843" }}>{r.name}</span> <span style={{ fontSize: 10*s, color: "#9C9890" }}>— {r.company} ({r.relationship})</span><br /><span style={{ fontSize: 10*s, color: "#9C9890" }}>{r.email} | {r.phone}</span></div>)}
        </section>}
        {data.settings.sections.affiliations && affiliations.length > 0 && <section style={{ marginBottom: p26 }}>
          <div style={{ width: p40, height: p3, background: accentColor, borderRadius: 2, marginBottom: p12 }} />
          <h2 style={{ fontSize: 10*s, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6B6860", margin: `0 0 ${p12}` }}>Afiliaciones</h2>
          {affiliations.map((a) => <div key={a.id} style={{ marginBottom: p8 }}><span style={{ fontSize: 11*s, fontWeight: 600, color: "#4A4843" }}>{a.organization}</span> <span style={{ fontSize: 10*s, color: "#9C9890" }}>— {a.role} ({a.startDate} — {a.endDate})</span></div>)}
        </section>}
      </div>
    </div>
  );
}