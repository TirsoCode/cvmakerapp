"use client";
import { useRef, useCallback } from "react";
import { ResumeProvider, useResume, uid } from "@/lib/store";
import { TEMPLATES } from "@/lib/types";
import SectionAccordion from "@/components/ui/SectionAccordion";
import FormField from "@/components/ui/FormField";
import TemplateSelector from "@/components/ui/TemplateSelector";
import ExportButton from "@/components/ui/ExportButton";
import MinimalTemplate from "@/components/templates/Minimal";
import EditorialTemplate from "@/components/templates/Editorial";
import ModernTemplate from "@/components/templates/Modern";
import ClassicTemplate from "@/components/templates/Classic";

function TemplateRenderer({ data, accentColor }: { data: any; accentColor: string }) {
  const props = { data, style: {} as React.CSSProperties };
  switch (data.settings.template) {
    case "editorial": return <EditorialTemplate {...props} />;
    case "modern": return <ModernTemplate {...props} />;
    case "classic": return <ClassicTemplate {...props} />;
    default: return <MinimalTemplate {...props} />;
  }
}

function EditorInner() {
  const {
    data, updatePersonal, updateSummary, updateExperience, updateEducation,
    updateSkills, updateLanguages, updateProjects, updateTemplate, updateAccentColor, resetData,
  } = useResume();

  const previewRef = useRef<HTMLDivElement>(null);

  const accentColor = data.settings.accentColor || "#C0392B";

  const handleExportPDF = useCallback(async () => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script.async = true;
    await new Promise<void>((resolve) => {
      script.onload = () => resolve();
      document.head.appendChild(script);
    });

    const script2 = document.createElement("script");
    script2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script2.async = true;
    await new Promise<void>((resolve) => {
      script2.onload = () => resolve();
      document.head.appendChild(script2);
    });

    const element = previewRef.current;
    if (!element) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2canvas = (window as any).html2canvas;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { jsPDF } = (window as any).jspdf;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const name = data.personal.name?.replace(/\s+/g, "_") || "cv";
    pdf.save(`${name}_cv.pdf`);
  }, [data]);

  const addExperience = () => {
    updateExperience([...data.experience, { id: uid(), company: "", position: "", startDate: "", endDate: "", description: "" }]);
  };

  const removeExperience = (id: string) => {
    updateExperience(data.experience.filter((e) => e.id !== id));
  };

  const updateExp = (id: string, field: string, value: string) => {
    updateExperience(data.experience.map((e) => e.id === id ? { ...e, [field]: value } : e));
  };

  const addEducation = () => {
    updateEducation([...data.education, { id: uid(), institution: "", degree: "", startDate: "", endDate: "" }]);
  };

  const removeEducation = (id: string) => {
    updateEducation(data.education.filter((e) => e.id !== id));
  };

  const updateEdu = (id: string, field: string, value: string) => {
    updateEducation(data.education.map((e) => e.id === id ? { ...e, [field]: value } : e));
  };

  const addSkill = () => {
    updateSkills([...data.skills, { id: uid(), category: "", items: [] }]);
  };

  const removeSkill = (id: string) => {
    updateSkills(data.skills.filter((s) => s.id !== id));
  };

  const updateSkillCat = (id: string, category: string) => {
    updateSkills(data.skills.map((s) => s.id === id ? { ...s, category } : s));
  };

  const updateSkillItems = (id: string, items: string[]) => {
    updateSkills(data.skills.map((s) => s.id === id ? { ...s, items } : s));
  };

  const addLanguage = () => {
    updateLanguages([...data.languages, { id: uid(), language: "", level: "" }]);
  };

  const removeLanguage = (id: string) => {
    updateLanguages(data.languages.filter((l) => l.id !== id));
  };

  const updateLang = (id: string, field: string, value: string) => {
    updateLanguages(data.languages.map((l) => l.id === id ? { ...l, [field]: value } : l));
  };

  const addProject = () => {
    updateProjects([...data.projects, { id: uid(), name: "", description: "", url: "" }]);
  };

  const removeProject = (id: string) => {
    updateProjects(data.projects.filter((p) => p.id !== id));
  };

  const updateProj = (id: string, field: string, value: string) => {
    updateProjects(data.projects.map((p) => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSkillItemsChange = (id: string, value: string) => {
    updateSkillItems(id, value.split(",").map((s) => s.trim()).filter(Boolean));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F3F2EE" }}>
      {/* LEFT PANEL */}
      <aside style={{ width: 380, minWidth: 380, background: "#fff", borderRight: "1px solid #E4E2DC", overflowY: "auto", maxHeight: "100vh", position: "sticky", top: 0 }}>
        {/* Editor header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E4E2DC", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="24" height="24" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="7" fill="#1A1918"/>
                <text x="16" y="22" textAnchor="middle" fontSize="17" fill="white" fontFamily="serif" fontWeight="700">R</text>
              </svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1918", fontFamily: "'Playfair Display', serif" }}>ResumeCraft</span>
            </a>
          </div>
          <button
            onClick={resetData}
            style={{ fontSize: 11, color: "#9C9890", background: "none", border: "none", cursor: "pointer", fontFamily: "'Instrument Sans', sans-serif" }}
            title="Borrar todo y empezar desde cero"
          >
            Reset
          </button>
        </div>

        {/* Form */}
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
            <FormField label="Website" value={data.personal.website} onChange={(v) => updatePersonal({ website: v })} placeholder="tuweb.com" />
          </SectionAccordion>

          {/* Summary */}
          <SectionAccordion title="Resumen Profesional" count={data.summary ? 1 : 0} defaultOpen>
            <FormField label="Resumen" value={data.summary} onChange={updateSummary} placeholder="Breve descripción de tu perfil profesional, experiencia clave y objetivos de carrera." type="textarea" />
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
            <button onClick={addExperience} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "'Instrument Sans', sans-serif" }}>
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
            <button onClick={addEducation} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "'Instrument Sans', sans-serif" }}>
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
            <button onClick={addSkill} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "'Instrument Sans', sans-serif" }}>
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
            <button onClick={addLanguage} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "'Instrument Sans', sans-serif" }}>
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
            <button onClick={addProject} style={{ width: "100%", padding: "9px", border: "1px dashed #E4E2DC", borderRadius: 8, background: "none", cursor: "pointer", fontSize: 12, color: "#9C9890", fontFamily: "'Instrument Sans', sans-serif" }}>
              + Añadir proyecto
            </button>
          </SectionAccordion>

          {/* Template settings */}
          <SectionAccordion title="Diseño" defaultOpen>
            <div style={{ marginBottom: 16 }}>
              <TemplateSelector selected={data.settings.template} onChange={updateTemplate} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Instrument Sans', sans-serif" }}>
                Color de accent
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["#C0392B", "#2563EB", "#16A34A", "#7C3AED", "#374151", "#1A1918", "#D97706", "#0891B2"].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateAccentColor(c)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: c,
                      border: data.settings.accentColor === c ? "2px solid #1A1918" : "2px solid transparent",
                      cursor: "pointer",
                      boxShadow: data.settings.accentColor === c ? "0 0 0 2px #fff, 0 0 0 4px #1A1918" : "none",
                      transition: "all 150ms ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </SectionAccordion>
        </div>
      </aside>

      {/* RIGHT PANEL — Preview */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px", overflowY: "auto" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, width: "100%", maxWidth: 720, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, display: "inline-block" }} />
            <span style={{ fontSize: 13, color: "#6B6860", fontFamily: "'Instrument Sans', sans-serif" }}>
              {TEMPLATES.find((t) => t.id === data.settings.template)?.name} · A4
            </span>
          </div>
          <ExportButton onExport={handleExportPDF} />
        </div>

        {/* A4 Paper */}
        <div
          ref={previewRef}
          style={{
            width: "100%",
            maxWidth: 720,
            transformOrigin: "top center",
          }}
        >
          <div className="a4-paper" style={{ transform: "scale(1)", transformOrigin: "top center", margin: "0 auto" }}>
            <TemplateRenderer data={data} accentColor={accentColor} />
          </div>
        </div>
      </main>
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
