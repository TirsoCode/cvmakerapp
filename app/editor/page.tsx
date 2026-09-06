"use client";
import { useRef, useCallback, useState } from "react";
import { ResumeProvider, useResume, uid } from "@/lib/store";
import { TEMPLATES } from "@/lib/types";
import SectionAccordion from "@/components/ui/SectionAccordion";
import FormField from "@/components/ui/FormField";
import MinimalTemplate from "@/components/templates/Minimal";
import EditorialTemplate from "@/components/templates/Editorial";
import ModernTemplate from "@/components/templates/Modern";
import ClassicTemplate from "@/components/templates/Classic";
import PrussianTemplate from "@/components/templates/Prussian";
import CascadeTemplate from "@/components/templates/Cascade";
import ArtisanTemplate from "@/components/templates/Artisan";
import GlacierTemplate from "@/components/templates/Glacier";
import EmberTemplate from "@/components/templates/Ember";
import ObsidianTemplate from "@/components/templates/Obsidian";
import IvoryTemplate from "@/components/templates/Ivory";
import CedarTemplate from "@/components/templates/Cedar";
import SlateTemplate from "@/components/templates/Slate";
import SandTemplate from "@/components/templates/Sand";
import PlumTemplate from "@/components/templates/Plum";
import MeridianTemplate from "@/components/templates/Meridian";
import CarbonTemplate from "@/components/templates/Carbon";
import AuroraTemplate from "@/components/templates/Aurora";
import VersaTemplate from "@/components/templates/Versa";
import OpusTemplate from "@/components/templates/Opus";

function TemplateRenderer({ data }: { data: any }) {
  const props = { data, style: {} as React.CSSProperties };
  switch (data.settings.template) {
    case "editorial": return <EditorialTemplate {...props} />;
    case "modern": return <ModernTemplate {...props} />;
    case "classic": return <ClassicTemplate {...props} />;
    case "prussian": return <PrussianTemplate {...props} />;
    case "cascade": return <CascadeTemplate {...props} />;
    case "artisan": return <ArtisanTemplate {...props} />;
    case "glacier": return <GlacierTemplate {...props} />;
    case "ember": return <EmberTemplate {...props} />;
    case "obsidian": return <ObsidianTemplate {...props} />;
    case "ivory": return <IvoryTemplate {...props} />;
    case "cedar": return <CedarTemplate {...props} />;
    case "slate": return <SlateTemplate {...props} />;
    case "sand": return <SandTemplate {...props} />;
    case "plum": return <PlumTemplate {...props} />;
    case "meridian": return <MeridianTemplate {...props} />;
    case "carbon": return <CarbonTemplate {...props} />;
    case "aurora": return <AuroraTemplate {...props} />;
    case "versa": return <VersaTemplate {...props} />;
    case "opus": return <OpusTemplate {...props} />;
    default: return <MinimalTemplate {...props} />;
  }
}

function TemplateSelectorGrid({ selected, onChange }: { selected: string; onChange: (t: any) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          title={t.name}
          style={{
            background: t.bg,
            border: selected === t.id ? `2px solid ${t.accent}` : "1px solid #E4E2DC",
            borderRadius: 8,
            padding: "8px 6px",
            cursor: "pointer",
            transition: "all 150ms ease",
            boxShadow: selected === t.id ? `0 0 0 2px ${t.accent}30` : "none",
          }}
        >
          <div style={{ width: "100%", height: 40, borderRadius: 4, background: selected === t.id ? `${t.accent}15` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: t.accent, fontFamily: "system-ui", letterSpacing: "-0.02em" }}>
              {t.name.substring(0, 3).toUpperCase()}
            </span>
          </div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.accent, margin: "0 auto" }} />
        </button>
      ))}
    </div>
  );
}

function EditorInner() {
  const {
    data, updatePersonal, updateSummary, updateExperience, updateEducation,
    updateSkills, updateLanguages, updateProjects, updateCertifications, updateAwards,
    updateLicenses, updateReferences, updateAffiliations,
    updateTemplate, updateAccentColor, updateFontPairing, updateSpacing, updateShowPhoto,
    updateSections, resetData,
  } = useResume();

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const accentColor = data.settings.accentColor || "#C0392B";

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updatePersonal({ photo: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  }, [updatePersonal]);

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.async = true;
      await new Promise<void>((resolve) => { script.onload = () => resolve(); document.head.appendChild(script); });

      const script2 = document.createElement("script");
      script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script2.async = true;
      await new Promise<void>((resolve) => { script2.onload = () => resolve(); document.head.appendChild(script2); });

      const element = previewRef.current;
      if (!element) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2canvas = (window as any).html2canvas;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { jsPDF } = (window as any).jspdf;

      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const name = data.personal.name?.replace(/\s+/g, "_") || "cv";
      pdf.save(`${name}_cv.pdf`);
    } finally {
      setIsExporting(false);
    }
  }, [data]);

  const handleExportMd = useCallback(() => {
    const { personal, summary, experience, education, skills, languages, projects, certifications, awards, licenses, references, affiliations } = data;
    let md = `# ${personal.name || "Mi CV"}\n\n`;
    if (personal.title) md += `**${personal.title}**\n\n`;
    if (personal.email || personal.phone || personal.location) md += `${[personal.email, personal.phone, personal.location].filter(Boolean).join(" · ")}\n\n`;
    if (personal.linkedin || personal.github || personal.portfolio) md += `${[personal.linkedin, personal.github, personal.portfolio].filter(Boolean).join(" · ")}\n\n`;
    if (summary) md += `## Resumen\n\n${summary}\n\n`;
    if (experience.length > 0) {
      md += `## Experiencia\n\n`;
      experience.forEach((e) => {
        md += `### ${e.position} — ${e.company}\n*${e.startDate} — ${e.endDate}*\n\n${e.description}\n\n`;
      });
    }
    if (education.length > 0) {
      md += `## Educación\n\n`;
      education.forEach((e) => { md += `### ${e.degree}\n${e.institution} · ${e.startDate} — ${e.endDate}\n\n`; });
    }
    if (skills.length > 0) {
      md += `## Habilidades\n\n`;
      skills.forEach((s) => { md += `**${s.category}:** ${s.items.join(", ")}\n`; });
      md += `\n`;
    }
    if (languages.length > 0) {
      md += `## Idiomas\n\n`;
      languages.forEach((l) => { md += `- ${l.language}: ${l.level}\n`; });
      md += `\n`;
    }
    if (certifications.length > 0) {
      md += `## Certificaciones\n\n`;
      certifications.forEach((c) => { md += `- **${c.name}** — ${c.issuer}${c.date ? ` (${c.date})` : ""}\n`; });
      md += `\n`;
    }
    if (awards.length > 0) {
      md += `## Premios y Honores\n\n`;
      awards.forEach((a) => { md += `- **${a.name}** — ${a.issuer}${a.date ? ` (${a.date})` : ""}\n`; });
      md += `\n`;
    }
    if (licenses.length > 0) {
      md += `## Licencias y Carnets\n\n`;
      licenses.forEach((l) => { md += `- **${l.name}** — ${l.issuer}${l.licenseNumber ? ` · Nº ${l.licenseNumber}` : ""}${l.date ? ` (${l.date})` : ""}\n`; });
      md += `\n`;
    }
    if (references.length > 0) {
      md += `## Referencias\n\n`;
      references.forEach((r) => {
        md += `**${r.name}** — ${r.relationship}${r.company ? `, ${r.company}` : ""}\n`;
        if (r.email) md += `  Email: ${r.email}\n`;
        if (r.phone) md += `  Tel: ${r.phone}\n`;
        md += `\n`;
      });
    }
    if (affiliations.length > 0) {
      md += `## Afiliaciones y Colegios\n\n`;
      affiliations.forEach((a) => { md += `- **${a.organization}**${a.role ? ` · ${a.role}` : ""}${a.startDate ? ` · ${a.startDate}` : ""}${a.endDate ? ` — ${a.endDate}` : ""}\n`; });
      md += `\n`;
    }
    if (projects.length > 0) {
      md += `## Proyectos\n\n`;
      projects.forEach((p) => {
        md += `### ${p.name}\n${p.description}\n`;
        if (p.url) md += `Link: ${p.url}\n`;
        md += `\n`;
      });
    }
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(personal.name || "cv").replace(/\s+/g, "_")}_cv.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const addExperience = () => updateExperience([...data.experience, { id: uid(), company: "", position: "", startDate: "", endDate: "", description: "" }]);
  const removeExperience = (id: string) => updateExperience(data.experience.filter((e) => e.id !== id));
  const updateExp = (id: string, field: string, value: string) => updateExperience(data.experience.map((e) => e.id === id ? { ...e, [field]: value } : e));

  const addEducation = () => updateEducation([...data.education, { id: uid(), institution: "", degree: "", startDate: "", endDate: "" }]);
  const removeEducation = (id: string) => updateEducation(data.education.filter((e) => e.id !== id));
  const updateEdu = (id: string, field: string, value: string) => updateEducation(data.education.map((e) => e.id === id ? { ...e, [field]: value } : e));

  const addSkill = () => updateSkills([...data.skills, { id: uid(), category: "", items: [] }]);
  const removeSkill = (id: string) => updateSkills(data.skills.filter((s) => s.id !== id));
  const updateSkillCat = (id: string, category: string) => updateSkills(data.skills.map((s) => s.id === id ? { ...s, category } : s));
  const updateSkillItems = (id: string, items: string[]) => updateSkills(data.skills.map((s) => s.id === id ? { ...s, items } : s));
  const handleSkillItemsChange = (id: string, value: string) => updateSkillItems(id, value.split(",").map((s) => s.trim()).filter(Boolean));

  const addLanguage = () => updateLanguages([...data.languages, { id: uid(), language: "", level: "" }]);
  const removeLanguage = (id: string) => updateLanguages(data.languages.filter((l) => l.id !== id));
  const updateLang = (id: string, field: string, value: string) => updateLanguages(data.languages.map((l) => l.id === id ? { ...l, [field]: value } : l));

  const addProject = () => updateProjects([...data.projects, { id: uid(), name: "", description: "", url: "" }]);
  const removeProject = (id: string) => updateProjects(data.projects.filter((p) => p.id !== id));
  const updateProj = (id: string, field: string, value: string) => updateProjects(data.projects.map((p) => p.id === id ? { ...p, [field]: value } : p));

  const addLicense = () => updateLicenses([...data.licenses, { id: uid(), name: "", issuer: "", date: "", licenseNumber: "" }]);
  const removeLicense = (id: string) => updateLicenses(data.licenses.filter((l) => l.id !== id));
  const updateLic = (id: string, field: string, value: string) => updateLicenses(data.licenses.map((l) => l.id === id ? { ...l, [field]: value } : l));

  const addReference = () => updateReferences([...data.references, { id: uid(), name: "", company: "", phone: "", email: "", relationship: "" }]);
  const removeReference = (id: string) => updateReferences(data.references.filter((r) => r.id !== id));
  const updateRef = (id: string, field: string, value: string) => updateReferences(data.references.map((r) => r.id === id ? { ...r, [field]: value } : r));

  const addAffiliation = () => updateAffiliations([...data.affiliations, { id: uid(), organization: "", role: "", startDate: "", endDate: "" }]);
  const removeAffiliation = (id: string) => updateAffiliations(data.affiliations.filter((a) => a.id !== id));
  const updateAff = (id: string, field: string, value: string) => updateAffiliations(data.affiliations.map((a) => a.id === id ? { ...a, [field]: value } : a));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F3F2EE" }}>
      {/* LEFT PANEL */}
      <aside style={{ width: 400, minWidth: 400, background: "#fff", borderRight: "1px solid #E4E2DC", overflowY: "auto", maxHeight: "100vh", position: "sticky", top: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E4E2DC", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="7" fill="#1A1918"/>
                <text x="16" y="22" textAnchor="middle" fontSize="17" fill="white" fontFamily="serif" fontWeight="700">R</text>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>CVMakerApp</span>
            </a>
          </div>
          <button onClick={resetData} style={{ fontSize: 11, color: "#9C9890", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-instrument), sans-serif" }} title="Borrar todo">
            Reset
          </button>
        </div>

        <div>
          {/* Personal */}
          <SectionAccordion title="Datos Personales" defaultOpen>
            <FormField label="Nombre completo" value={data.personal.name} onChange={(v) => updatePersonal({ name: v })} placeholder="María García López" />
            <FormField label="Título profesional" value={data.personal.title} onChange={(v) => updatePersonal({ title: v })} placeholder="Diseñadora de Producto" />
            <FormField label="Email" value={data.personal.email} onChange={(v) => updatePersonal({ email: v })} placeholder="maria@email.com" type="email" />
            <FormField label="Teléfono" value={data.personal.phone} onChange={(v) => updatePersonal({ phone: v })} placeholder="+34 612 345 678" type="tel" />
            <FormField label="Ubicación" value={data.personal.location} onChange={(v) => updatePersonal({ location: v })} placeholder="Madrid, España" />
            <FormField label="LinkedIn" value={data.personal.linkedin} onChange={(v) => updatePersonal({ linkedin: v })} placeholder="linkedin.com/in/tu-perfil" />
            <FormField label="GitHub" value={data.personal.github} onChange={(v) => updatePersonal({ github: v })} placeholder="github.com/tu-usuario" />
            <FormField label="Portfolio" value={data.personal.portfolio || ""} onChange={(v) => updatePersonal({ portfolio: v })} placeholder="tuportfolio.com" />
            <div style={{ marginTop: 8 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Foto de perfil
              </label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => fileInputRef.current?.click()} style={{ padding: "7px 14px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
                  {data.personal.photo ? "Cambiar foto" : "Subir foto"}
                </button>
                {data.personal.photo && (
                  <button onClick={() => updatePersonal({ photo: undefined })} style={{ fontSize: 11, color: "#C0392B", background: "none", border: "none", cursor: "pointer" }}>
                    Quitar
                  </button>
                )}
              </div>
              {data.personal.photo && <img src={data.personal.photo} alt="Preview" style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover", marginTop: 8 }} />}
            </div>
          </SectionAccordion>

          {/* Summary */}
          <SectionAccordion title="Resumen Profesional" count={data.summary ? 1 : 0} defaultOpen>
            <FormField label="Resumen" value={data.summary} onChange={updateSummary} placeholder="Breve descripción de tu perfil profesional..." type="textarea" />
          </SectionAccordion>

          {/* Experience */}
          <SectionAccordion title="Experiencia" count={data.experience.length} defaultOpen={data.experience.length > 0}>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{exp.position || "Nuevo puesto"}</span>
                  <button onClick={() => removeExperience(exp.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Empresa" value={exp.company} onChange={(v) => updateExp(exp.id, "company", v)} placeholder="Stripe" />
                <FormField label="Puesto" value={exp.position} onChange={(v) => updateExp(exp.id, "position", v)} placeholder="Senior Product Designer" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <FormField label="Desde" value={exp.startDate} onChange={(v) => updateExp(exp.id, "startDate", v)} placeholder="Ene 2022" />
                  <FormField label="Hasta" value={exp.endDate} onChange={(v) => updateExp(exp.id, "endDate", v)} placeholder="Presente" />
                </div>
                <FormField label="Descripción" value={exp.description} onChange={(v) => updateExp(exp.id, "description", v)} placeholder="Logros y responsabilidades…" type="textarea" />
              </div>
            ))}
            <button onClick={addExperience} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir experiencia
            </button>
          </SectionAccordion>

          {/* Education */}
          <SectionAccordion title="Educación" count={data.education.length} defaultOpen={data.education.length > 0}>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{edu.degree || "Nueva formación"}</span>
                  <button onClick={() => removeEducation(edu.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Institución" value={edu.institution} onChange={(v) => updateEdu(edu.id, "institution", v)} placeholder="ESADE" />
                <FormField label="Título" value={edu.degree} onChange={(v) => updateEdu(edu.id, "degree", v)} placeholder="Máster en Diseño Digital" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <FormField label="Desde" value={edu.startDate} onChange={(v) => updateEdu(edu.id, "startDate", v)} placeholder="2017" />
                  <FormField label="Hasta" value={edu.endDate} onChange={(v) => updateEdu(edu.id, "endDate", v)} placeholder="2019" />
                </div>
              </div>
            ))}
            <button onClick={addEducation} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir formación
            </button>
          </SectionAccordion>

          {/* Skills */}
          <SectionAccordion title="Habilidades" count={data.skills.length} defaultOpen={data.skills.length > 0}>
            {data.skills.map((sk) => (
              <div key={sk.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{sk.category || "Nueva categoría"}</span>
                  <button onClick={() => removeSkill(sk.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Categoría" value={sk.category} onChange={(v) => updateSkillCat(sk.id, v)} placeholder="Diseño, Frontend, etc." />
                <FormField label="Habilidades (separadas por coma)" value={sk.items.join(", ")} onChange={(v) => handleSkillItemsChange(sk.id, v)} placeholder="Figma, React, CSS" />
              </div>
            ))}
            <button onClick={addSkill} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir categoría
            </button>
          </SectionAccordion>

          {/* Languages */}
          <SectionAccordion title="Idiomas" count={data.languages.length} defaultOpen={data.languages.length > 0}>
            {data.languages.map((lang) => (
              <div key={lang.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{lang.language || "Nuevo idioma"}</span>
                  <button onClick={() => removeLanguage(lang.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Idioma" value={lang.language} onChange={(v) => updateLang(lang.id, "language", v)} placeholder="Inglés" />
                <FormField label="Nivel" value={lang.level} onChange={(v) => updateLang(lang.id, "level", v)} placeholder="C2 — Fluido" />
              </div>
            ))}
            <button onClick={addLanguage} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir idioma
            </button>
          </SectionAccordion>

          {/* Projects */}
          <SectionAccordion title="Proyectos" count={data.projects.length} defaultOpen={data.projects.length > 0}>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{proj.name || "Nuevo proyecto"}</span>
                  <button onClick={() => removeProject(proj.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Nombre" value={proj.name} onChange={(v) => updateProj(proj.id, "name", v)} placeholder="Mi proyecto" />
                <FormField label="Descripción" value={proj.description} onChange={(v) => updateProj(proj.id, "description", v)} placeholder="Descripción del proyecto" type="textarea" />
                <FormField label="URL" value={proj.url} onChange={(v) => updateProj(proj.id, "url", v)} placeholder="github.com/tu/proyecto" />
              </div>
            ))}
            <button onClick={addProject} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir proyecto
            </button>
          </SectionAccordion>

          {/* Certifications */}
          <SectionAccordion title="Certificaciones" count={data.certifications.length} defaultOpen={data.certifications.length > 0}>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{cert.name || "Nueva certificación"}</span>
                  <button onClick={() => updateCertifications(data.certifications.filter((c) => c.id !== cert.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Nombre" value={cert.name} onChange={(v) => updateCertifications(data.certifications.map((c) => c.id === cert.id ? { ...c, name: v } : c))} placeholder="AWS Solutions Architect" />
                <FormField label="Organismo" value={cert.issuer} onChange={(v) => updateCertifications(data.certifications.map((c) => c.id === cert.id ? { ...c, issuer: v } : c))} placeholder="Amazon Web Services" />
                <FormField label="Fecha" value={cert.date} onChange={(v) => updateCertifications(data.certifications.map((c) => c.id === cert.id ? { ...c, date: v } : c))} placeholder="2024" />
              </div>
            ))}
            <button onClick={() => updateCertifications([...data.certifications, { id: uid(), name: "", issuer: "", date: "" }])} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir certificación
            </button>
          </SectionAccordion>

          {/* Awards */}
          <SectionAccordion title="Premios y Honores" count={data.awards.length} defaultOpen={data.awards.length > 0}>
            {data.awards.map((award) => (
              <div key={award.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{award.name || "Nuevo premio"}</span>
                  <button onClick={() => updateAwards(data.awards.filter((a) => a.id !== award.id))} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Nombre" value={award.name} onChange={(v) => updateAwards(data.awards.map((a) => a.id === award.id ? { ...a, name: v } : a))} placeholder="Mejor Diseñador del Año" />
                <FormField label="Organismo" value={award.issuer} onChange={(v) => updateAwards(data.awards.map((a) => a.id === award.id ? { ...a, issuer: v } : a))} placeholder="Awwwards" />
                <FormField label="Fecha" value={award.date} onChange={(v) => updateAwards(data.awards.map((a) => a.id === award.id ? { ...a, date: v } : a))} placeholder="2024" />
              </div>
            ))}
            <button onClick={() => updateAwards([...data.awards, { id: uid(), name: "", issuer: "", date: "" }])} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir premio
            </button>
          </SectionAccordion>

          {/* Licencias y Carnets */}
          <SectionAccordion title="Licencias y Carnets" count={data.licenses.length} defaultOpen={data.licenses.length > 0}>
            {data.licenses.map((lic) => (
              <div key={lic.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{lic.name || "Nueva licencia"}</span>
                  <button onClick={() => removeLicense(lic.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Licencia / Carnet" value={lic.name} onChange={(v) => updateLic(lic.id, "name", v)} placeholder="Carnet de Conducir B, PVP Electricista..." />
                <FormField label="Organismo emissor" value={lic.issuer} onChange={(v) => updateLic(lic.id, "issuer", v)} placeholder="DGT, Colegio Oficial..." />
                <FormField label="Número de licencia" value={lic.licenseNumber || ""} onChange={(v) => updateLic(lic.id, "licenseNumber", v)} placeholder="123456789" />
                <FormField label="Fecha" value={lic.date} onChange={(v) => updateLic(lic.id, "date", v)} placeholder="2020" />
              </div>
            ))}
            <button onClick={addLicense} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir licencia
            </button>
          </SectionAccordion>

          {/* Referencias */}
          <SectionAccordion title="Referencias" count={data.references.length} defaultOpen={data.references.length > 0}>
            {data.references.map((ref) => (
              <div key={ref.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{ref.name || "Nueva referencia"}</span>
                  <button onClick={() => removeReference(ref.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Nombre completo" value={ref.name} onChange={(v) => updateRef(ref.id, "name", v)} placeholder="Juan Pérez García" />
                <FormField label="Empresa / Organismo" value={ref.company} onChange={(v) => updateRef(ref.id, "company", v)} placeholder="Banco Santander" />
                <FormField label="Relación" value={ref.relationship} onChange={(v) => updateRef(ref.id, "relationship", v)} placeholder="Jefe directo, Cliente..." />
                <FormField label="Email" value={ref.email} onChange={(v) => updateRef(ref.id, "email", v)} placeholder="juan.perez@email.com" type="email" />
                <FormField label="Teléfono" value={ref.phone} onChange={(v) => updateRef(ref.id, "phone", v)} placeholder="+34 600 000 000" type="tel" />
              </div>
            ))}
            <button onClick={addReference} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir referencia
            </button>
          </SectionAccordion>

          {/* Afiliaciones */}
          <SectionAccordion title="Afiliaciones y Colegios" count={data.affiliations.length} defaultOpen={data.affiliations.length > 0}>
            {data.affiliations.map((aff) => (
              <div key={aff.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{aff.organization || "Nueva afiliación"}</span>
                  <button onClick={() => removeAffiliation(aff.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9C9890", fontSize: 14, padding: "2px 6px" }}>✕</button>
                </div>
                <FormField label="Organismo / Colegio" value={aff.organization} onChange={(v) => updateAff(aff.id, "organization", v)} placeholder="Ilustre Colegio de Abogados de Madrid" />
                <FormField label="Número de colegiado" value={aff.role} onChange={(v) => updateAff(aff.id, "role", v)} placeholder="Nº 45.678" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <FormField label="Desde" value={aff.startDate} onChange={(v) => updateAff(aff.id, "startDate", v)} placeholder="2015" />
                  <FormField label="Hasta" value={aff.endDate} onChange={(v) => updateAff(aff.id, "endDate", v)} placeholder="Presente" />
                </div>
              </div>
            ))}
            <button onClick={addAffiliation} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "var(--font-instrument), sans-serif" }}>
              + Añadir afiliación
            </button>
          </SectionAccordion>

          {/* Diseño */}
          <SectionAccordion title="Diseño" defaultOpen>
            <div style={{ marginBottom: 16 }}>
              <TemplateSelectorGrid selected={data.settings.template} onChange={updateTemplate} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Color de accent
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["#C0392B", "#2563EB", "#16A34A", "#7C3AED", "#374151", "#1A1918", "#D97706", "#0891B2", "#BE123C", "#065F46", "#0C4A6E", "#92400E"].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateAccentColor(c)}
                    style={{
                      width: 28, height: 28, borderRadius: 6, background: c,
                      border: data.settings.accentColor === c ? "2px solid #1A1918" : "2px solid transparent",
                      cursor: "pointer",
                      boxShadow: data.settings.accentColor === c ? "0 0 0 2px #fff, 0 0 0 4px #1A1918" : "none",
                      transition: "all 150ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Fuente
              </label>
              <select
                value={data.settings.fontPairing}
                onChange={(e) => updateFontPairing(e.target.value as any)}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #E4E2DC", borderRadius: 8, fontSize: 12, fontFamily: "var(--font-instrument), sans-serif", background: "#fff", color: "#1A1918", cursor: "pointer" }}
              >
                <option value="default">Modern (Instrument Sans)</option>
                <option value="serif">Classic (Playfair + Source Serif)</option>
                <option value="mono">Tech (Space Grotesk + JetBrains)</option>
                <option value="display">Display (Fraunces + DM Sans)</option>
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Espaciado
              </label>
              <select
                value={data.settings.spacing}
                onChange={(e) => updateSpacing(e.target.value as any)}
                style={{ width: "100%", padding: "8px 10px", border: "1px solid #E4E2DC", borderRadius: 8, fontSize: 12, fontFamily: "var(--font-instrument), sans-serif", background: "#fff", color: "#1A1918", cursor: "pointer" }}
              >
                <option value="compact">Compacto</option>
                <option value="normal">Normal</option>
                <option value="relaxed">Relajado</option>
              </select>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#1A1918", cursor: "pointer", fontFamily: "var(--font-instrument), sans-serif" }}>
                <input type="checkbox" checked={data.settings.showPhoto} onChange={(e) => updateShowPhoto(e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
                Mostrar foto de perfil
              </label>
            </div>
          </SectionAccordion>
        </div>
      </aside>

      {/* RIGHT PANEL — Preview */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px", overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 24, width: "100%", maxWidth: 720, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, display: "inline-block" }} />
            <span style={{ fontSize: 13, color: "#6B6860", fontFamily: "var(--font-instrument), sans-serif" }}>
              {TEMPLATES.find((t) => t.id === data.settings.template)?.name} · A4
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleExportMd} className="boton-neobrutalista" style={{ padding: "8px 16px", fontSize: 12 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
              </svg>
              Exportar MD
            </button>
            <button onClick={handleExportPDF} disabled={isExporting} className="boton-neobrutalista boton-neobrutalista-primario" style={{ padding: "8px 16px", fontSize: 12 }}>
              {isExporting ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Exportando…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Exportar PDF
                </>
              )}
            </button>
          </div>
        </div>

        <div ref={previewRef} style={{ width: "100%", maxWidth: 720 }}>
          <div className="a4-paper" style={{ transform: "scale(1)", transformOrigin: "top center", margin: "0 auto" }}>
            <TemplateRenderer data={data} />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function EditorPage() {
  return (
    <ResumeProvider>
      <EditorInner />
    </ResumeProvider>
  );
}
