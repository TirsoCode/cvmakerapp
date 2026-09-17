"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import { ResumeProvider, useResume, uid } from "@/lib/store";
import {
  TEMPLATES, FONT_PAIRINGS, SECTION_LABELS, DEFAULT_SECTION_ORDER,
  type SectionKey, type FontPairing, type Spacing, type ResumeData,
} from "@/lib/types";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
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

function ATSTemplate({ data }: { data: any }) {
  const font = FONT_PAIRINGS.find((f) => f.id === data.settings.fontPairing)?.body || "system-ui";
  const p = data.personal;
  return (
    <div style={{ fontFamily: font, color: "#000", background: "#fff", padding: "40px 48px", fontSize: 12, lineHeight: 1.6 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{p.name || "Tu Nombre"}</h1>
      {p.title && <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 8px" }}>{p.title}</p>}
      <p style={{ margin: "0 0 4px" }}>
        {[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).join(" | ")}
      </p>
      {data.summary && <p style={{ margin: "12px 0" }}>{data.summary}</p>}
      {data.experience.length > 0 && <>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>EXPERIENCIA LABORAL</h2>
        {data.experience.map((e: any) => <div key={e.id} style={{ marginBottom: 10 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{e.position} — {e.company}</p>
          <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>{e.startDate} — {e.endDate}</p>
          <p style={{ margin: "4px 0 0" }}>{e.description}</p>
        </div>)}
      </>}
      {data.education.length > 0 && <>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>EDUCACIÓN</h2>
        {data.education.map((e: any) => <div key={e.id} style={{ marginBottom: 8 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{e.degree}</p>
          <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>{e.institution} | {e.startDate} — {e.endDate}</p>
        </div>)}
      </>}
      {data.skills.length > 0 && <>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>HABILIDADES</h2>
        {data.skills.map((s: any) => <p key={s.id} style={{ margin: "2px 0" }}>{s.category}: {(s.items || []).join(", ")}</p>)}
      </>}
      {data.languages.length > 0 && <>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>IDIOMAS</h2>
        <p>{data.languages.map((l: any) => `${l.language} (${l.level})`).join(", ")}</p>
      </>}
      {data.certifications.length > 0 && <>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>CERTIFICACIONES</h2>
        {data.certifications.map((c: any) => <p key={c.id} style={{ margin: "2px 0" }}>{c.name} — {c.issuer}{c.date ? ` (${c.date})` : ""}</p>)}
      </>}
      {data.projects.length > 0 && <>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>PROYECTOS</h2>
        {data.projects.map((p: any) => <div key={p.id} style={{ marginBottom: 6 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{p.name}{p.url ? ` — ${p.url}` : ""}</p>
          <p style={{ margin: "2px 0 0" }}>{p.description}</p>
        </div>)}
      </>}
    </div>
  );
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

function FontPicker({ value, onChange }: { value: FontPairing; onChange: (v: FontPairing) => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
      {FONT_PAIRINGS.map((fp) => {
        const active = fp.id === value;
        return (
          <button
            key={fp.id}
            onClick={() => onChange(fp.id)}
            title={fp.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 4,
              padding: "10px 12px",
              borderRadius: 10,
              background: active ? "#FAFAF8" : "#FFFFFF",
              border: active ? "1.5px solid #1A1918" : "1px solid #E4E2DC",
              cursor: "pointer",
              transition: "all 150ms ease",
              boxShadow: active ? "2px 2px 0 0 rgba(0,0,0,0.1)" : "none",
            }}
          >
            <span style={{ fontFamily: fp.heading, fontSize: 14, fontWeight: 700, color: "#1A1918", lineHeight: 1.2 }}>{fp.name}</span>
            <span style={{ fontSize: 10, color: active ? "#6B6860" : "#9C9890", fontFamily: fp.body, fontWeight: 500 }}>Aa Bb 123 — cuerpo</span>
          </button>
        );
      })}
    </div>
  );
}

function SpacingPicker({ value, onChange }: { value: Spacing; onChange: (v: Spacing) => void }) {
  const options: { id: Spacing; label: string; bars: number; note: string }[] = [
    { id: "compact", label: "Compacto", bars: 2, note: "Más contenido por página" },
    { id: "normal", label: "Normal", bars: 3, note: "Equilibrado" },
    { id: "relaxed", label: "Relajado", bars: 5, note: "Máxima legibilidad" },
  ];
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            title={o.note}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "10px 6px",
              borderRadius: 10,
              background: active ? "#FAFAF8" : "#FFFFFF",
              border: active ? "1.5px solid #1A1918" : "1px solid #E4E2DC",
              cursor: "pointer",
              transition: "all 150ms ease",
              boxShadow: active ? "2px 2px 0 0 rgba(0,0,0,0.1)" : "none",
            }}
          >
            <span style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 4, height: 4 + (i + o.bars) * 2, borderRadius: 2, background: active ? "#1A1918" : "#CBC8C0" }} />
              ))}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: active ? "#1A1918" : "#6B6860" }}>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* Dashboard Component */
function Dashboard({ onOpenEditor }: { onOpenEditor: () => void }) {
  const { cvList, currentCvId, selectCv, createNewCv, duplicateCv, deleteCv, renameCv } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#F3F2EE", padding: "40px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1918", margin: 0, fontFamily: "var(--font-playfair), serif" }}>Mis Currículums</h1>
              <p style={{ fontSize: 13, color: "#6B6860", margin: 0 }}>{cvList.length} CV{cvList.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button onClick={() => { createNewCv(); onOpenEditor(); }} className="boton-neobrutalista boton-neobrutalista-primario" style={{ padding: "10px 20px", fontSize: 13 }}>
            + Nuevo CV
          </button>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {cvList.map((cv) => (
            <div key={cv.id} onClick={() => { selectCv(cv.id); onOpenEditor(); }} style={{
              background: "#fff", border: "1px solid #E4E2DC", borderRadius: 12, padding: "16px 20px",
              cursor: "pointer", transition: "all 150ms", display: "flex", alignItems: "center", gap: 16,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1A1918"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#E4E2DC"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 8, background: `${TEMPLATES.find((t) => t.id === cv.data.settings.template)?.accent || "#1A1918"}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: TEMPLATES.find((t) => t.id === cv.data.settings.template)?.accent || "#1A1918" }}>
                  {(cv.data.personal.name || "CV")[0].toUpperCase()}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                {editingId === cv.id ? (
                  <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} onBlur={() => { renameCv(cv.id, editName); setEditingId(null); }} onKeyDown={(e) => { if (e.key === "Enter") { renameCv(cv.id, editName); setEditingId(null); } }} onClick={(e) => e.stopPropagation()} style={{ fontSize: 15, fontWeight: 600, border: "1px solid #E4E2DC", borderRadius: 6, padding: "4px 8px", width: "100%", fontFamily: "inherit" }} />
                ) : (
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1918", margin: "0 0 4px" }}>{cv.name}</h3>
                )}
                <p style={{ fontSize: 12, color: "#9C9890", margin: 0 }}>
                  {TEMPLATES.find((t) => t.id === cv.data.settings.template)?.name} · {new Date(cv.updatedAt).toLocaleDateString("es-ES")}
                </p>
              </div>
              <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { setEditingId(cv.id); setEditName(cv.name); }} className="boton-neobrutalista-sm" style={{ padding: "5px 10px" }}>Renombrar</button>
                <button onClick={() => duplicateCv(cv.id)} className="boton-neobrutalista-sm" style={{ padding: "5px 10px" }}>Duplicar</button>
                {cvList.length > 1 && <button onClick={() => deleteCv(cv.id)} className="boton-neobrutalista-sm boton-neobrutalista-primario" style={{ padding: "5px 10px" }}>Eliminar</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Editor Inner */
function EditorInner() {
  const {
    data, updatePersonal, updateSummary, updateExperience, updateEducation,
    updateSkills, updateLanguages, updateProjects, updateCertifications, updateAwards,
    updateLicenses, updateReferences, updateAffiliations,
    updateTemplate, updateAccentColor, updateFontPairing, updateSpacing, updateShowPhoto,
    updateSections, resetData,
    customSections, addCustomSection, updateCustomSection, removeCustomSection,
    sectionOrder, moveSection,
    cvList, currentCvId, createNewCv, selectCv, duplicateCv, deleteCv, renameCv,
    validate, pageEstimate,
  } = useResume();

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [atsMode, setAtsMode] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareJson, setShareJson] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [validationIssues, setValidationIssues] = useState<ReturnType<typeof validate>>([]);
  const [toast, setToast] = useState("");

  const accentColor = data.settings.accentColor || "#C0392B";
  const issues = validate();
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warnCount = issues.filter((i) => i.severity === "warning").length;

  useEffect(() => {
    setValidationIssues(issues);
  }, [data]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  // Restore CV from shared URL param ?cv=<compressed>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("cv");
    if (encoded) {
      try {
        let json = decompressFromEncodedURIComponent(encoded);
        if (!json) {
          // legacy base64 encoding
          json = decodeURIComponent(atob(encoded));
        }
        const parsed = JSON.parse(json) as ResumeData;
        if (parsed && parsed.personal && parsed.settings) {
          createNewCv(parsed);
          window.history.replaceState({}, "", window.location.pathname);
          setToast("CV importado desde el enlace compartido");
        }
      } catch {
        // invalid shared payload, ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setToast("Elige un archivo de imagen (JPG, PNG o WebP)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (!result) return;
      updatePersonal({ photo: result });
      if (!data.settings.showPhoto) updateShowPhoto(true);
      setToast("Foto añadida. Ya se muestra en tu CV");
    };
    reader.readAsDataURL(file);
  }, [updatePersonal, updateShowPhoto, data.settings.showPhoto]);

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
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const pageHeightPx = Math.round((canvas.height * pdfWidth) / canvas.width);
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      let heightLeft = canvas.height - pageHeightPx;
      let position = 0;
      while (heightLeft > 0) {
        position -= pageHeightPx;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeightPx;
      }
      const name = data.personal.name?.replace(/\s+/g, "_") || "cv";
      pdf.save(`${name}_cv.pdf`);
    } finally {
      setIsExporting(false);
    }
  }, [data]);

  const handleExportMd = useCallback(() => {
    const { personal, summary } = data;
    const exp = data.experience || [];
    const edu = data.education || [];
    const skills = data.skills || [];
    const langs = data.languages || [];
    const projs = data.projects || [];
    const certs = data.certifications || [];
    const awards = data.awards || [];
    const lic = data.licenses || [];
    const refs = data.references || [];
    const affs = data.affiliations || [];

    let md = `# ${personal.name || "Mi CV"}\n\n`;
    if (personal.title) md += `${personal.title}\n\n`;
    const contact = [personal.email, personal.phone, personal.location].filter(Boolean).join(" · ");
    const links = [personal.linkedin, personal.github, personal.portfolio, personal.website].filter(Boolean).join(" · ");
    if (contact || links) {
      if (contact) md += `${contact}\n`;
      if (links) md += `${links}\n`;
      md += "\n";
    }

    const sectionMarkdown: Partial<Record<SectionKey, string>> = {};

    if (summary?.trim()) sectionMarkdown.summary = `## Resumen\n\n${summary.trim()}`;

    if (exp.length) {
      sectionMarkdown.experience = "## Experiencia\n\n" + exp.map((e) => {
        const head = [e.position, e.company].filter(Boolean).join(" — ") || "Puesto";
        const dates = [e.startDate, e.endDate].filter(Boolean).join(" — ");
        return `### ${head}\n${dates ? `${dates}\n` : ""}${e.description?.trim() ? `\n${e.description.trim()}` : ""}`.trim();
      }).join("\n\n");
    }

    if (edu.length) {
      sectionMarkdown.education = "## Educación\n\n" + edu.map((e) => {
        const head = e.degree || "Formación";
        const meta = [e.institution, [e.startDate, e.endDate].filter(Boolean).join(" — ")].filter(Boolean).join(" · ");
        return `### ${head}\n${meta}`.trim();
      }).join("\n\n");
    }

    if (skills.length) {
      sectionMarkdown.skills = "## Habilidades\n\n" + skills.map((s) => {
        const name = s.category || "Habilidades";
        return s.items?.length ? `- **${name}:** ${s.items.join(", ")}` : `- ${name}`;
      }).join("\n");
    }

    if (langs.length) {
      sectionMarkdown.languages = "## Idiomas\n\n" + langs.map((l) =>
        [`- ${l.language}`, l.level].filter(Boolean).join(" — ")
      ).join("\n");
    }

    if (projs.length) {
      sectionMarkdown.projects = "## Proyectos\n\n" + projs.map((p) => {
        const lines = [`### ${p.name || "Proyecto"}`];
        if (p.description?.trim()) lines.push(p.description.trim());
        if (p.url?.trim()) lines.push(`Link: ${p.url.trim()}`);
        return lines.join("\n");
      }).join("\n\n");
    }

    if (certs.length) {
      sectionMarkdown.certifications = "## Certificaciones\n\n" + certs.map((c) => {
        const parts = [`- **${c.name || "Certificación"}**`];
        if (c.issuer) parts.push(c.issuer);
        if (c.date) parts.push(`(${c.date})`);
        return parts.join(" — ");
      }).join("\n");
    }

    if (awards.length) {
      sectionMarkdown.awards = "## Premios y Honores\n\n" + awards.map((a) => {
        const parts = [`- **${a.name || "Premio"}**`];
        if (a.issuer) parts.push(a.issuer);
        if (a.date) parts.push(`(${a.date})`);
        return parts.join(" — ");
      }).join("\n");
    }

    if (lic.length) {
      sectionMarkdown.licenses = "## Licencias y Carnets\n\n" + lic.map((l) => {
        const parts = [`- **${l.name || "Licencia"}**`];
        if (l.issuer) parts.push(l.issuer);
        if (l.licenseNumber) parts.push(`Nº ${l.licenseNumber}`);
        if (l.date) parts.push(`(${l.date})`);
        return parts.join(" — ");
      }).join("\n");
    }

    if (refs.length) {
      sectionMarkdown.references = "## Referencias\n\n" + refs.map((r) => {
        const lines = [`**${r.name || "Referencia"}**${r.relationship ? ` — ${r.relationship}` : ""}${r.company ? `, ${r.company}` : ""}`];
        if (r.email) lines.push(`Email: ${r.email}`);
        if (r.phone) lines.push(`Teléfono: ${r.phone}`);
        return lines.join("\n");
      }).join("\n\n");
    }

    if (affs.length) {
      sectionMarkdown.affiliations = "## Afiliaciones y Colegios\n\n" + affs.map((a) => {
        const parts = [a.organization || "Afiliación"];
        if (a.role) parts.push(a.role);
        if (a.startDate) parts.push(a.startDate);
        if (a.endDate) parts.push(`— ${a.endDate}`);
        return `- ${parts.join(" · ")}`;
      }).join("\n");
    }

    const order = data.settings.sectionOrder?.length ? data.settings.sectionOrder : DEFAULT_SECTION_ORDER;
    for (const key of order) {
      if (data.settings.sections?.[key] === false) continue;
      const content = sectionMarkdown[key];
      if (content) md += `${content}\n\n`;
    }

    if (customSections?.length) {
      for (const cs of customSections) {
        if (!cs.title && !cs.content) continue;
        md += `## ${cs.title || "Sección"}\n\n${cs.content.trim()}\n\n`;
      }
    }

    md = md.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(personal.name || "mi_cv").replace(/[^\w\u00C0-\u024F]+/g, "_").replace(/^_+|_+$/g, "") || "mi_cv"}_cv.md`; a.click();
    URL.revokeObjectURL(url);
    setToast("Markdown generado correctamente");
  }, [data, customSections]);

  const handlePrint = useCallback(() => { window.print(); }, []);

  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    }
  }, []);

  const handleShare = useCallback(() => {
    const json = JSON.stringify(data);
    setShareJson(json);
    const { photo: _photo, ...personalNoPhoto } = data.personal;
    const shareable = { ...data, personal: personalNoPhoto };
    const compressed = compressToEncodedURIComponent(JSON.stringify(shareable));
    setShareUrl(`${window.location.origin}/editor?cv=${compressed}`);
    setShowShareModal(true);
  }, [data]);

  const handleCopyShareUrl = useCallback(async () => {
    await copyText(shareUrl);
    setToast("Enlace copiado al portapapeles");
  }, [shareUrl, copyText]);

  const handleCopyShareMessage = useCallback(async () => {
    const name = data.personal.name || "mi CV";
    const text = `¡Hola! Te comparto mi currículum:\n\n${name}\n${shareUrl}\n\n— Hecho con CVMakerApp`;
    await copyText(text);
    setToast("Mensaje copiado. Pégalo en WhatsApp o tu chat favorito");
  }, [shareUrl, data, copyText]);

  const handleImportJson = useCallback(() => {
    try {
      const parsed = JSON.parse(shareJson);
      if (parsed.personal && parsed.settings) {
        createNewCv(parsed);
        setShowShareModal(false);
        setToast("CV importado correctamente");
      } else {
        setToast("JSON inválido");
      }
    } catch {
      setToast("JSON inválido");
    }
  }, [shareJson, createNewCv]);

  const handleDownloadJson = useCallback(() => {
    const blob = new Blob([shareJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(data.personal.name || "cv").replace(/\s+/g, "_")}_cv.json`; a.click();
    URL.revokeObjectURL(url);
  }, [shareJson, data]);

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

  if (showDashboard) {
    return <Dashboard onOpenEditor={() => setShowDashboard(false)} />;
  }

  return (
    <div className="editor-root" style={{ display: "flex", minHeight: "100vh", background: "#F3F2EE" }}>
      {/* LEFT PANEL */}
      <aside className="editor-aside" style={{ width: 400, minWidth: 400, background: "#fff", borderRight: "1px solid #E4E2DC", overflowY: "auto", maxHeight: "100vh", position: "sticky", top: 0 }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #E4E2DC", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setShowDashboard(true)} className="boton-neobrutalista-sm" style={{ padding: "4px 10px" }}>CV</button>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>CVMakerApp</span>
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={resetData} className="boton-neobrutalista-sm" style={{ padding: "4px 10px", fontSize: 10 }} title="Borrar todo">Reset</button>
          </div>
        </div>

        {/* Validation bar */}
        {(errorCount > 0 || warnCount > 0) && (
          <div style={{ padding: "8px 16px", borderBottom: "1px solid #E4E2DC", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: errorCount > 0 ? "#FEF2F2" : "#FFFBEB" }} onClick={() => setShowErrors(!showErrors)}>
            {errorCount > 0 && <span style={{ fontSize: 11, color: "#DC2626", fontWeight: 700 }}>{errorCount} error{errorCount !== 1 ? "es" : ""}</span>}
            {warnCount > 0 && <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700 }}>{warnCount} advertencia{warnCount !== 1 ? "s" : ""}</span>}
            <span style={{ fontSize: 10, color: "#9C9890", marginLeft: "auto", fontWeight: 600 }}>{showErrors ? "Ocultar" : "Ver detalles"}</span>
          </div>
        )}
        {showErrors && (
          <div style={{ padding: "8px 16px", borderBottom: "1px solid #E4E2DC", background: "#FAFAF8", maxHeight: 150, overflowY: "auto" }}>
            {validationIssues.map((issue, i) => (
              <div key={i} style={{ fontSize: 11, padding: "3px 0", color: issue.severity === "error" ? "#DC2626" : "#D97706" }}>
                {issue.message}
              </div>
            ))}
          </div>
        )}

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
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Foto de perfil</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
              {data.personal.photo ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={data.personal.photo} alt={data.personal.name || "Foto de perfil"} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${accentColor}40`, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => fileInputRef.current?.click()} className="boton-neobrutalista-sm" style={{ padding: "6px 12px" }}>Cambiar foto</button>
                      <button onClick={() => { updatePersonal({ photo: undefined }); setToast("Foto eliminada"); }} className="boton-neobrutalista-sm" style={{ padding: "6px 12px" }}>Quitar</button>
                    </div>
                    {!data.settings.showPhoto && <p style={{ fontSize: 10, color: "#D97706", margin: "4px 0 0", fontWeight: 600 }}>Activa «Mostrar foto» en Diseño para verla en el CV.</p>}
                  </div>
                </div>
              ) : (
                <button onClick={() => fileInputRef.current?.click()} className="boton-neobrutalista-sm" style={{ padding: "6px 12px" }}>
                  Subir foto
                </button>
              )}
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
                  <button onClick={() => removeExperience(exp.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
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
            <button onClick={addExperience} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir experiencia</button>
          </SectionAccordion>

          {/* Education */}
          <SectionAccordion title="Educación" count={data.education.length} defaultOpen={data.education.length > 0}>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{edu.degree || "Nueva formación"}</span>
                  <button onClick={() => removeEducation(edu.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Institución" value={edu.institution} onChange={(v) => updateEdu(edu.id, "institution", v)} placeholder="ESADE" />
                <FormField label="Título" value={edu.degree} onChange={(v) => updateEdu(edu.id, "degree", v)} placeholder="Máster en Diseño Digital" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <FormField label="Desde" value={edu.startDate} onChange={(v) => updateEdu(edu.id, "startDate", v)} placeholder="2017" />
                  <FormField label="Hasta" value={edu.endDate} onChange={(v) => updateEdu(edu.id, "endDate", v)} placeholder="2019" />
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir formación</button>
          </SectionAccordion>

          {/* Skills */}
          <SectionAccordion title="Habilidades" count={data.skills.length} defaultOpen={data.skills.length > 0}>
            {data.skills.map((sk) => (
              <div key={sk.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{sk.category || "Nueva categoría"}</span>
                  <button onClick={() => removeSkill(sk.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Categoría" value={sk.category} onChange={(v) => updateSkillCat(sk.id, v)} placeholder="Diseño, Frontend, etc." />
                <FormField label="Habilidades (separadas por coma)" value={sk.items.join(", ")} onChange={(v) => handleSkillItemsChange(sk.id, v)} placeholder="Figma, React, CSS" />
              </div>
            ))}
            <button onClick={addSkill} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir categoría</button>
          </SectionAccordion>

          {/* Languages */}
          <SectionAccordion title="Idiomas" count={data.languages.length} defaultOpen={data.languages.length > 0}>
            {data.languages.map((lang) => (
              <div key={lang.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{lang.language || "Nuevo idioma"}</span>
                  <button onClick={() => removeLanguage(lang.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Idioma" value={lang.language} onChange={(v) => updateLang(lang.id, "language", v)} placeholder="Inglés" />
                <FormField label="Nivel" value={lang.level} onChange={(v) => updateLang(lang.id, "level", v)} placeholder="C2 — Fluido" />
              </div>
            ))}
            <button onClick={addLanguage} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir idioma</button>
          </SectionAccordion>

          {/* Projects */}
          <SectionAccordion title="Proyectos" count={data.projects.length} defaultOpen={data.projects.length > 0}>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{proj.name || "Nuevo proyecto"}</span>
                  <button onClick={() => removeProject(proj.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Nombre" value={proj.name} onChange={(v) => updateProj(proj.id, "name", v)} placeholder="Mi proyecto" />
                <FormField label="Descripción" value={proj.description} onChange={(v) => updateProj(proj.id, "description", v)} placeholder="Descripción del proyecto" type="textarea" />
                <FormField label="URL" value={proj.url} onChange={(v) => updateProj(proj.id, "url", v)} placeholder="github.com/tu/proyecto" />
              </div>
            ))}
            <button onClick={addProject} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir proyecto</button>
          </SectionAccordion>

          {/* Certifications */}
          <SectionAccordion title="Certificaciones" count={data.certifications.length} defaultOpen={data.certifications.length > 0}>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{cert.name || "Nueva certificación"}</span>
                  <button onClick={() => updateCertifications(data.certifications.filter((c) => c.id !== cert.id))} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Nombre" value={cert.name} onChange={(v) => updateCertifications(data.certifications.map((c) => c.id === cert.id ? { ...c, name: v } : c))} placeholder="AWS Solutions Architect" />
                <FormField label="Organismo" value={cert.issuer} onChange={(v) => updateCertifications(data.certifications.map((c) => c.id === cert.id ? { ...c, issuer: v } : c))} placeholder="Amazon Web Services" />
                <FormField label="Fecha" value={cert.date} onChange={(v) => updateCertifications(data.certifications.map((c) => c.id === cert.id ? { ...c, date: v } : c))} placeholder="2024" />
              </div>
            ))}
            <button onClick={() => updateCertifications([...data.certifications, { id: uid(), name: "", issuer: "", date: "" }])} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir certificación</button>
          </SectionAccordion>

          {/* Awards */}
          <SectionAccordion title="Premios y Honores" count={data.awards.length} defaultOpen={data.awards.length > 0}>
            {data.awards.map((award) => (
              <div key={award.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{award.name || "Nuevo premio"}</span>
                  <button onClick={() => updateAwards(data.awards.filter((a) => a.id !== award.id))} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Nombre" value={award.name} onChange={(v) => updateAwards(data.awards.map((a) => a.id === award.id ? { ...a, name: v } : a))} placeholder="Mejor Diseñador del Año" />
                <FormField label="Organismo" value={award.issuer} onChange={(v) => updateAwards(data.awards.map((a) => a.id === award.id ? { ...a, issuer: v } : a))} placeholder="Awwwards" />
                <FormField label="Fecha" value={award.date} onChange={(v) => updateAwards(data.awards.map((a) => a.id === award.id ? { ...a, date: v } : a))} placeholder="2024" />
              </div>
            ))}
            <button onClick={() => updateAwards([...data.awards, { id: uid(), name: "", issuer: "", date: "" }])} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir premio</button>
          </SectionAccordion>

          {/* Licenses */}
          <SectionAccordion title="Licencias y Carnets" count={data.licenses.length} defaultOpen={data.licenses.length > 0}>
            {data.licenses.map((lic) => (
              <div key={lic.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{lic.name || "Nueva licencia"}</span>
                  <button onClick={() => removeLicense(lic.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Licencia / Carnet" value={lic.name} onChange={(v) => updateLic(lic.id, "name", v)} placeholder="Carnet de Conducir B" />
                <FormField label="Organismo emisor" value={lic.issuer} onChange={(v) => updateLic(lic.id, "issuer", v)} placeholder="DGT" />
                <FormField label="Número de licencia" value={lic.licenseNumber || ""} onChange={(v) => updateLic(lic.id, "licenseNumber", v)} placeholder="123456789" />
                <FormField label="Fecha" value={lic.date} onChange={(v) => updateLic(lic.id, "date", v)} placeholder="2020" />
              </div>
            ))}
            <button onClick={addLicense} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir licencia</button>
          </SectionAccordion>

          {/* References */}
          <SectionAccordion title="Referencias" count={data.references.length} defaultOpen={data.references.length > 0}>
            {data.references.map((ref) => (
              <div key={ref.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{ref.name || "Nueva referencia"}</span>
                  <button onClick={() => removeReference(ref.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Nombre completo" value={ref.name} onChange={(v) => updateRef(ref.id, "name", v)} placeholder="Juan Pérez García" />
                <FormField label="Empresa / Organismo" value={ref.company} onChange={(v) => updateRef(ref.id, "company", v)} placeholder="Banco Santander" />
                <FormField label="Relación" value={ref.relationship} onChange={(v) => updateRef(ref.id, "relationship", v)} placeholder="Jefe directo" />
                <FormField label="Email" value={ref.email} onChange={(v) => updateRef(ref.id, "email", v)} placeholder="juan@email.com" type="email" />
                <FormField label="Teléfono" value={ref.phone} onChange={(v) => updateRef(ref.id, "phone", v)} placeholder="+34 600 000 000" type="tel" />
              </div>
            ))}
            <button onClick={addReference} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir referencia</button>
          </SectionAccordion>

          {/* Affiliations */}
          <SectionAccordion title="Afiliaciones y Colegios" count={data.affiliations.length} defaultOpen={data.affiliations.length > 0}>
            {data.affiliations.map((aff) => (
              <div key={aff.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1918" }}>{aff.organization || "Nueva afiliación"}</span>
                  <button onClick={() => removeAffiliation(aff.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Organismo / Colegio" value={aff.organization} onChange={(v) => updateAff(aff.id, "organization", v)} placeholder="Ilustre Colegio de Abogados de Madrid" />
                <FormField label="Número de colegiado" value={aff.role} onChange={(v) => updateAff(aff.id, "role", v)} placeholder="Nº 45.678" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <FormField label="Desde" value={aff.startDate} onChange={(v) => updateAff(aff.id, "startDate", v)} placeholder="2015" />
                  <FormField label="Hasta" value={aff.endDate} onChange={(v) => updateAff(aff.id, "endDate", v)} placeholder="Presente" />
                </div>
              </div>
            ))}
            <button onClick={addAffiliation} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir afiliación</button>
          </SectionAccordion>

          {/* Custom Sections */}
          <SectionAccordion title="Secciones Personalizadas" count={customSections.length} defaultOpen={false}>
            {customSections.map((cs) => (
              <div key={cs.id} style={{ background: "#FAFAF8", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <input value={cs.title} onChange={(e) => updateCustomSection(cs.id, { title: e.target.value })} style={{ fontSize: 12, fontWeight: 700, color: "#1A1918", border: "none", background: "none", padding: 0, width: "80%" }} />
                  <button onClick={() => removeCustomSection(cs.id)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Quitar</button>
                </div>
                <FormField label="Contenido" value={cs.content} onChange={(v) => updateCustomSection(cs.id, { content: v })} placeholder="Escribe el contenido de esta sección..." type="textarea" />
              </div>
            ))}
            <button onClick={() => addCustomSection("Nueva sección")} className="boton-neobrutalista-sm" style={{ width: "100%", padding: "8px", justifyContent: "center", fontSize: 11 }}>+ Añadir sección personalizada</button>
          </SectionAccordion>

          {/* Section Order */}
          <SectionAccordion title="Orden de Secciones" defaultOpen={false}>
            <p style={{ fontSize: 11, color: "#9C9890", margin: "0 0 10px" }}>Usa los botones para reordenar</p>
            {sectionOrder.map((key, idx) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", background: "#FAFAF8", marginBottom: 4, border: "1px solid #E4E2DC" }}>
                <span style={{ fontSize: 10, color: "#9C9890", width: 16, fontWeight: 700 }}>{idx + 1}</span>
                <span style={{ fontSize: 12, flex: 1, color: "#1A1918", fontWeight: 500 }}>{SECTION_LABELS[key] || key}</span>
                <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#9C9890" }}>
                  <input type="checkbox" checked={data.settings.sections[key]} onChange={(e) => updateSections({ [key]: e.target.checked })} style={{ width: 14, height: 14, cursor: "pointer" }} />
                  visible
                </label>
                <button disabled={idx === 0} onClick={() => moveSection(idx, idx - 1)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Subir</button>
                <button disabled={idx === sectionOrder.length - 1} onClick={() => moveSection(idx, idx + 1)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Bajar</button>
              </div>
            ))}
          </SectionAccordion>

          {/* Design */}
          <SectionAccordion title="Diseño" defaultOpen>
            <div style={{ marginBottom: 16 }}>
              <TemplateSelectorGrid selected={data.settings.template} onChange={updateTemplate} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Color de accent</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["#C0392B", "#2563EB", "#16A34A", "#7C3AED", "#374151", "#1A1918", "#D97706", "#0891B2", "#BE123C", "#065F46", "#0C4A6E", "#92400E"].map((c) => (
                  <button key={c} onClick={() => updateAccentColor(c)} style={{
                    width: 28, height: 28, borderRadius: 6, background: c,
                    border: data.settings.accentColor === c ? "2px solid #000" : "1px solid #E4E2DC",
                    cursor: "pointer", boxShadow: data.settings.accentColor === c ? "2px 2px 0 0 #000" : "none",
                    transition: "all 150ms ease",
                  }} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Fuente</label>
              <FontPicker value={data.settings.fontPairing} onChange={updateFontPairing} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Espaciado</label>
              <SpacingPicker value={data.settings.spacing} onChange={updateSpacing} />
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#1A1918", cursor: "pointer" }}>
                <input type="checkbox" checked={data.settings.showPhoto} onChange={(e) => updateShowPhoto(e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
                Mostrar foto de perfil
              </label>
            </div>
          </SectionAccordion>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="editor-main" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 24px", overflowY: "auto" }}>
        {/* Toolbar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, width: "100%", maxWidth: previewMode === "mobile" ? 400 : 720, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#6B6860" }}>{TEMPLATES.find((t) => t.id === data.settings.template)?.name}</span>
            <span className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10, boxShadow: "2px 2px 0px 0px #000000" }}>
              {pageEstimate} página{pageEstimate !== 1 ? "s" : ""}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button onClick={() => setPreviewMode("desktop")} className={`boton-neobrutalista-sm${previewMode === "desktop" ? " boton-neobrutalista-primario" : ""}`} style={{ padding: "6px 12px", fontSize: 11 }}>
              Escritorio
            </button>
            <button onClick={() => setPreviewMode("mobile")} className={`boton-neobrutalista-sm${previewMode === "mobile" ? " boton-neobrutalista-primario" : ""}`} style={{ padding: "6px 12px", fontSize: 11 }}>
              Móvil
            </button>
            <button onClick={() => setAtsMode(!atsMode)} className={`boton-neobrutalista-sm${atsMode ? " boton-neobrutalista-primario" : ""}`} style={{ padding: "6px 12px", fontSize: 11 }}>
              ATS
            </button>
            <button onClick={handleShare} className="boton-neobrutalista-sm" style={{ padding: "6px 12px", fontSize: 11 }} title="Compartir">
              Compartir
            </button>
            <button onClick={handlePrint} className="boton-neobrutalista-sm" style={{ padding: "6px 12px", fontSize: 11 }} title="Imprimir">
              Imprimir
            </button>
            <button onClick={handleExportMd} className="boton-neobrutalista" style={{ padding: "6px 12px", fontSize: 11 }}>
              MD
            </button>
            <button onClick={handleExportPDF} disabled={isExporting} className="boton-neobrutalista boton-neobrutalista-primario" style={{ padding: "6px 12px", fontSize: 11 }}>
              {isExporting ? "Exportando…" : "PDF"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div ref={previewRef} style={{ width: "100%", maxWidth: previewMode === "mobile" ? 375 : 720 }}>
          <div className={previewMode === "mobile" ? "a4-paper-mobile" : "a4-paper"} style={{ transform: "scale(1)", transformOrigin: "top center", margin: "0 auto" }}>
            {atsMode ? <ATSTemplate data={data} /> : <TemplateRenderer data={data} />}
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(26,25,24,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }} onClick={() => setShowShareModal(false)}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "24px 24px 20px", maxWidth: 520, width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #E4E2DC" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: accentColor, display: "inline-block", flexShrink: 0 }} />
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, fontFamily: "var(--font-playfair), serif", color: "#1A1918" }}>Comparte tu CV</h3>
            </div>
            <p style={{ fontSize: 12, color: "#6B6860", margin: "0 0 16px", lineHeight: 1.55 }}>
              {data.personal.name && <>El currículum de <strong>{data.personal.name}</strong> está listo.</>} Quien abra el enlace podrá ver tu CV en el editor y descargarlo.
            </p>

            <div style={{ border: "1px dashed #CBC8C0", borderRadius: 12, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", marginBottom: 10, background: "#FAFAF8" }}>
              <code style={{ flex: 1, fontSize: 11, color: "#6B6860", wordBreak: "break-all", fontFamily: "var(--font-jetbrains), monospace", maxHeight: 64, overflow: "auto", lineHeight: 1.5 }}>{shareUrl}</code>
              <button onClick={handleCopyShareUrl} className="boton-neobrutalista" style={{ padding: "8px 14px", fontSize: 11, whiteSpace: "nowrap", flexShrink: 0 }} title="Copiar el enlace">
                Copiar
              </button>
            </div>

            <button onClick={handleCopyShareMessage} className="boton-neobrutalista boton-neobrutalista-primario" style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: 12, marginBottom: 8 }}>
              Copiar mensaje listo para WhatsApp
            </button>
            <p style={{ fontSize: 10, color: "#9C9890", margin: "0 0 4px", lineHeight: 1.5 }}>
              Se copia un mensaje con tu nombre ya incluido. La foto de perfil no viaja en el enlace para que sea corto.
            </p>

            <div style={{ height: 1, background: "#E4E2DC", margin: "14px 0" }} />

            <div style={{ fontSize: 11, fontWeight: 600, color: "#6B6860", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Backup e importación</div>
            <textarea value={shareJson} onChange={(e) => setShareJson(e.target.value)} style={{ width: "100%", height: 110, fontSize: 10, fontFamily: "monospace", padding: 10, border: "1px solid #E4E2DC", borderRadius: 10, resize: "vertical", background: "#FAFAF8", color: "#1A1918", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={handleDownloadJson} className="boton-neobrutalista-sm" style={{ padding: "6px 12px" }}>Descargar JSON</button>
              <button onClick={handleImportJson} className="boton-neobrutalista-sm" style={{ padding: "6px 12px" }}>Importar JSON</button>
              <button onClick={() => setShowShareModal(false)} className="boton-neobrutalista-sm" style={{ marginLeft: "auto", padding: "6px 12px" }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#1A1918", color: "#fff", padding: "10px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", zIndex: 200, fontFamily: "var(--font-instrument), sans-serif", maxWidth: 300 }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .a4-paper-mobile {
          width: 375px;
          min-height: 667px;
          background: white;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        @media print {
          body * { visibility: hidden !important; }
          .a4-paper, .a4-paper-mobile, .a4-paper *, .a4-paper-mobile * { visibility: visible !important; }
          .a4-paper, .a4-paper-mobile {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: auto;
            box-shadow: none;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function EditorClient() {
  return (
    <ResumeProvider>
      <EditorInner />
    </ResumeProvider>
  );
}