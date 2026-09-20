"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import { ResumeProvider, useResume, uid } from "@/lib/store";
import {
  TEMPLATES, FONT_PAIRINGS, SECTION_LABELS, DEFAULT_SECTION_ORDER,
  type FontPairing, type ResumeData, type SectionKey,
} from "@/lib/types";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { getOrderedSections } from "@/components/templates/helpers";

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

function ATSBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <h2 style={{ fontSize: 14, fontWeight: 700, margin: "16px 0 8px", borderBottom: "1px solid #ccc", paddingBottom: 4 }}>{label}</h2>
      {children}
    </>
  );
}

function ATSTemplate({ data }: { data: any }) {
  const font = FONT_PAIRINGS.find((f) => f.id === data.settings.fontPairing)?.body || "system-ui";
  const p = data.personal;
  const ordered = getOrderedSections(data);
  const renderSection = (key: SectionKey) => {
    switch (key) {
      case "summary":
        return data.summary && <ATSBlock label="RESUMEN"><p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{data.summary}</p></ATSBlock>;
      case "experience":
        return data.experience.length > 0 && <ATSBlock label="EXPERIENCIA LABORAL">{data.experience.map((e: any) => <div key={e.id} style={{ marginBottom: 10 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{e.position} — {e.company}</p>
          <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>{e.startDate} — {e.endDate}</p>
          <p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{e.description}</p>
        </div>)}</ATSBlock>;
      case "education":
        return data.education.length > 0 && <ATSBlock label="EDUCACIÓN">{data.education.map((e: any) => <div key={e.id} style={{ marginBottom: 8 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{e.degree}</p>
          <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>{e.institution} | {e.startDate} — {e.endDate}</p>
        </div>)}</ATSBlock>;
      case "skills":
        return data.skills.length > 0 && <ATSBlock label="HABILIDADES">{data.skills.map((s: any) => <p key={s.id} style={{ margin: "2px 0" }}>{s.category}: {(s.items || []).filter(Boolean).join(", ")}</p>)}</ATSBlock>;
      case "languages":
        return data.languages.length > 0 && <ATSBlock label="IDIOMAS"><p style={{ margin: "4px 0 0" }}>{data.languages.map((l: any) => `${l.language} (${l.level})`).join(", ")}</p></ATSBlock>;
      case "projects":
        return data.projects.length > 0 && <ATSBlock label="PROYECTOS">{data.projects.map((pr: any) => <div key={pr.id} style={{ marginBottom: 6 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{pr.name}{pr.url ? ` — ${pr.url}` : ""}</p>
          <p style={{ margin: "2px 0 0" }}>{pr.description}</p>
        </div>)}</ATSBlock>;
      case "certifications":
        return data.certifications.length > 0 && <ATSBlock label="CERTIFICACIONES">{data.certifications.map((c: any) => <p key={c.id} style={{ margin: "2px 0" }}>{c.name} — {c.issuer}{c.date ? ` (${c.date})` : ""}</p>)}</ATSBlock>;
      case "awards":
        return data.awards.length > 0 && <ATSBlock label="PREMIOS Y HONORES">{data.awards.map((a: any) => <p key={a.id} style={{ margin: "2px 0" }}>{a.name} — {a.issuer}{a.date ? ` (${a.date})` : ""}</p>)}</ATSBlock>;
      case "licenses":
        return data.licenses.length > 0 && <ATSBlock label="LICENCIAS Y CARNETS">{data.licenses.map((l: any) => <p key={l.id} style={{ margin: "2px 0" }}>{l.name} — {l.issuer}{l.licenseNumber ? ` (${l.licenseNumber})` : ""}{l.date ? ` · ${l.date}` : ""}</p>)}</ATSBlock>;
      case "references":
        return data.references.length > 0 && <ATSBlock label="REFERENCIAS">{data.references.map((r: any) => <div key={r.id} style={{ marginBottom: 6 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{r.name}</p>
          <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>{r.company}{r.relationship ? ` — ${r.relationship}` : ""}{r.email ? ` · ${r.email}` : ""}{r.phone ? ` · ${r.phone}` : ""}</p>
        </div>)}</ATSBlock>;
      case "affiliations":
        return data.affiliations.length > 0 && <ATSBlock label="AFILIACIONES Y COLEGIOS">{data.affiliations.map((a: any) => <div key={a.id} style={{ marginBottom: 6 }}>
          <p style={{ fontWeight: 700, margin: 0 }}>{a.organization}</p>
          <p style={{ fontSize: 11, color: "#555", margin: "2px 0" }}>{a.role}{a.startDate ? ` — ${a.startDate}${a.endDate ? ` — ${a.endDate}` : ""}` : ""}</p>
        </div>)}</ATSBlock>;
      default:
        return null;
    }
  };
  return (
    <div style={{ fontFamily: font, color: "#000", background: "#fff", padding: "40px 48px", fontSize: 12, lineHeight: 1.6 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{p.name || "Tu Nombre"}</h1>
      {p.title && <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 8px" }}>{p.title}</p>}
      <p style={{ margin: "0 0 4px" }}>
        {[p.email, p.phone, p.location, p.website, p.linkedin, p.github, p.portfolio].filter(Boolean).join(" | ")}
      </p>
      {ordered.map(({ key, visible }) => visible ? renderSection(key) : null)}
      {(data.customSections || []).map((cs: any) => (
        <div key={cs.id}>
          <ATSBlock label={(cs.title || "Sección").toUpperCase()}><p style={{ margin: "4px 0 0", whiteSpace: "pre-wrap" }}>{cs.content}</p></ATSBlock>
        </div>
      ))}
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
             boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.1)",
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
                  background: "#FFFFFF",
                  border: active ? "1.5px solid #1A1918" : "1px solid #E4E2DC",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.1)",
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

/* Dashboard Component */
function Dashboard({ onOpenEditor }: { onOpenEditor: () => void }) {
  const { cvList, currentCvId, selectCv, createNewCv, duplicateCv, deleteCv, renameCv } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
     <div style={{ minHeight: "100vh", background: "#FFFFFF", padding: "40px 24px" }}>
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
    updateTemplate, updateAccentColor, updateFontPairing,
    updateSections, resetData,
    customSections, addCustomSection, updateCustomSection, removeCustomSection,
    sectionOrder, moveSection,
    cvList, currentCvId, createNewCv, selectCv, duplicateCv, deleteCv, renameCv,
    validate, pageEstimate,
  } = useResume();

  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [atsMode, setAtsMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const paperZoomRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const [measuredPages, setMeasuredPages] = useState(1);
  const [showErrors, setShowErrors] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [panelHidden, setPanelHidden] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [validationIssues, setValidationIssues] = useState<ReturnType<typeof validate>>([]);
  const [toast, setToast] = useState("");

  const [activeSection, setActiveSection] = useState<string>("personal");
  const asideRef = useRef<HTMLElement>(null);

  const clampZoom = (z: number) => Math.min(2, Math.max(0.25, Math.round(z * 100) / 100));
  const zoomIn = () => setZoom((z) => clampZoom(z + 0.25));
  const zoomOut = () => setZoom((z) => clampZoom(z - 0.25));

  useEffect(() => {
    if (paperZoomRef.current) {
      paperZoomRef.current.style.zoom = String(zoom);
    }
  }, [zoom]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setZoom((z) => clampZoom(e.deltaY < 0 ? z + 0.25 : z - 0.25));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Mide la altura real del CV renderizado (ancho A4, 794px = 210mm a 96dpi)
  // para generar exactamente las hojas que necesite. Antes se usaba solo la
  // heurística estimatePages() y el contenido que la superaba se cortaba en el
  // preview y en el PDF exportado.
  useEffect(() => {
    const el = probeRef.current;
    if (!el) return;
    const pxPerPage = (297 * 96) / 25.4; // ≈1122.5px por página A4
    const pages = Math.max(1, Math.ceil((el.scrollHeight + 12) / pxPerPage));
    setMeasuredPages(pages);
  }, [data, atsMode]);

  const NAV_GROUPS: { label: string; items: { id: string; label: string; count: number }[] }[] = [
    {
      label: "Perfil",
      items: [
        { id: "personal", label: "Datos Personales", count: 0 },
        { id: "summary", label: "Resumen", count: data.summary ? 1 : 0 },
      ],
    },
    {
      label: "Contenido",
      items: [
        { id: "experience", label: "Experiencia", count: data.experience.length },
        { id: "education", label: "Educación", count: data.education.length },
        { id: "skills", label: "Habilidades", count: data.skills.length },
        { id: "languages", label: "Idiomas", count: data.languages.length },
        { id: "projects", label: "Proyectos", count: data.projects.length },
        { id: "certifications", label: "Certificaciones", count: data.certifications.length },
        { id: "awards", label: "Premios y Honores", count: data.awards.length },
        { id: "licenses", label: "Licencias y Carnets", count: data.licenses.length },
        { id: "references", label: "Referencias", count: data.references.length },
        { id: "affiliations", label: "Afiliaciones y Colegios", count: data.affiliations.length },
        { id: "custom", label: "Secciones Personalizadas", count: customSections.length },
      ],
    },
    {
      label: "Apariencia",
      items: [{ id: "design", label: "Diseño", count: 0 }],
    },
    {
      label: "Estructura",
      items: [{ id: "order", label: "Orden de Secciones", count: 0 }],
    },
  ];

  const goToSection = (id: string) => {
    setActiveSection(id);
    if (panelHidden) setPanelHidden(false);
    setTimeout(() => {
      const target = document.getElementById("section-" + id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        asideRef.current?.scrollTo?.({ top: 0, behavior: "smooth" });
      }
    }, 60);
  };

  // Nº de hojas: suficiente para que el contenido nunca se corte (medición
  // real) aunque la heurística estimatePages() subestime.
  const totalPages = Math.max(pageEstimate, measuredPages);

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

  // Restore CV from shared URL param ?cv=<JSON comprimido con lz-string>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("cv");
    if (encoded) {
      try {
        const json = decompressFromEncodedURIComponent(encoded) || decodeURIComponent(encoded);
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

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    let wasMobile = false;
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
      const zoomEl = paperZoomRef.current;
      const prevZoom = zoomEl?.style.zoom;
      if (zoomEl) zoomEl.style.zoom = "1";
      // El PDF siempre se genera en formato A4 (vista Escritorio). Si el preview
      // estaba en modo Móvil, renderiza las hojas A4 durante la exportación.
      wasMobile = previewMode === "mobile";
      if (wasMobile) setPreviewMode("desktop");
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(null))));
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      // Se captura cada hoja A4 por separado: evita que los márgenes entre
      // hojas y el zoom del preview desalineen las páginas del PDF.
      const papers = Array.from(element.querySelectorAll<HTMLElement>(".a4-paper, .a4-paper-mobile"));
      const targets = papers.length > 0 ? papers : [element];
      for (let i = 0; i < targets.length; i++) {
        const canvas = await html2canvas(targets[i], { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false });
        if (i > 0) pdf.addPage();
        const imgData = canvas.toDataURL("image/png");
        const pxPerMm = canvas.width / pdfWidth;
        const imgHeightMm = canvas.height / pxPerMm;
        // Alto de UNA página A4 expresado en píxeles del canvas. Antes se usaba
        // el alto total de la imagen, lo que cortaba el contenido a partir de la
        // página 2 del PDF.
        const pageHeightPx = Math.round(pdfHeight * pxPerMm);
        let offsetPx = 0;
        let firstSlice = true;
        while (firstSlice || offsetPx + pageHeightPx < canvas.height - 1) {
          if (!firstSlice) pdf.addPage();
          firstSlice = false;
          pdf.addImage(imgData, "PNG", 0, -(offsetPx / pxPerMm), pdfWidth, imgHeightMm);
          offsetPx += pageHeightPx;
        }
      }
      if (wasMobile) setPreviewMode("mobile");
      if (zoomEl) zoomEl.style.zoom = prevZoom || String(zoom);
      const name = data.personal.name?.replace(/\s+/g, "_") || "cv";
      pdf.save(`${name}_cv.pdf`);
    } finally {
      setIsExporting(false);
      if (wasMobile) setPreviewMode("mobile");
      if (paperZoomRef.current) paperZoomRef.current.style.zoom = String(zoom);
    }
  }, [data, zoom, previewMode]);


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
    // Se comprime el JSON con lz-string para generar un enlace corto. Sin
    // compresión, un CV con muchas secciones supera el límite de caracteres y
    // WhatsApp/Telegram truncan la URL, rompiendo el enlace compartido.
    const encoded = compressToEncodedURIComponent(JSON.stringify(data));
    setShareUrl(`${window.location.origin}/editor?cv=${encoded}`);
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
  // Se guarda el texto tal cual (incluido el último elemento vacío) para que al
  // escribir "Figma, React" la coma no desaparezca del input y la siguiente
  // letra no se concatene con la anterior. Los vacíos se descartan solo al
  // renderizar en las plantillas (filter(Boolean) antes del join).
  const handleSkillItemsChange = (id: string, value: string) => updateSkillItems(id, value.split(",").map((s) => s.trim()));

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
     <div className="editor-root" style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#FFFFFF" }}>
      {/* SIDEBAR NAV */}
      <nav className="editor-nav">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="editor-nav-group">
            <div className="editor-nav-group-label">{group.label}</div>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => goToSection(item.id)}
                className={`editor-nav-item${activeSection === item.id ? " editor-nav-item-active" : ""}`}
              >
                <span>{item.label}</span>
                {item.count > 0 && <span className="editor-nav-count">{item.count}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* LEFT PANEL */}
       <aside ref={asideRef} className="editor-aside" style={{ width: panelHidden ? 0 : 400, minWidth: panelHidden ? 0 : 400, background: "#fff", borderRight: panelHidden ? "none" : "1px solid #E4E2DC", overflowY: "auto", height: "100vh", display: panelHidden ? "none" : "flex", flexDirection: "column", transition: "all 150ms ease" }}>
        <div className="editor-aside-header" style={{ padding: "12px 16px", borderBottom: "1px solid #E4E2DC", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setShowDashboard(true)} className="boton-neobrutalista-sm" style={{ padding: "4px 10px" }}>CV</button>
            <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>CVMakerApp</span>
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={() => setPanelHidden(v => !v)} className="boton-neobrutalista-sm" style={{ padding: "5px 10px", fontSize: 11, fontWeight: 700, background: panelHidden ? "#1A1918" : "#fff", color: panelHidden ? "#fff" : "#1A1918" }} title="Ocultar panel">{panelHidden ? "Mostrar" : "Ocultar"}</button>
            <button onClick={resetData} className="boton-neobrutalista-sm" style={{ padding: "4px 10px", fontSize: 10 }} title="Borrar todo">Reset</button>
          </div>
        </div>

        {/* Validation bar */}
        {(errorCount > 0 || warnCount > 0) && (
           <div style={{ padding: "8px 16px", borderBottom: "1px solid #E4E2DC", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: "#FFFFFF" }} onClick={() => setShowErrors(!showErrors)}>
            {errorCount > 0 && <span style={{ fontSize: 11, color: "#DC2626", fontWeight: 700 }}>{errorCount} error{errorCount !== 1 ? "es" : ""}</span>}
            {warnCount > 0 && <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700 }}>{warnCount} advertencia{warnCount !== 1 ? "s" : ""}</span>}
            <span style={{ fontSize: 10, color: "#9C9890", marginLeft: "auto", fontWeight: 600 }}>{showErrors ? "Ocultar" : "Ver detalles"}</span>
          </div>
        )}
        {showErrors && (
          <div style={{ padding: "8px 16px", borderBottom: "1px solid #E4E2DC", background: "#FFFFFF", maxHeight: 150, overflowY: "auto" }}>
            {validationIssues.map((issue, i) => (
              <div key={i} style={{ fontSize: 11, padding: "3px 0", color: issue.severity === "error" ? "#DC2626" : "#D97706" }}>
                {issue.message}
              </div>
            ))}
          </div>
        )}

        <div>
          {/* Personal */}
          <SectionAccordion title="Datos Personales" defaultOpen style={{}} sectionId="section-personal" active={activeSection === "personal"}>
            <FormField label="Nombre completo" value={data.personal.name} onChange={(v) => updatePersonal({ name: v })} placeholder="María García López" />
            <FormField label="Título profesional" value={data.personal.title} onChange={(v) => updatePersonal({ title: v })} placeholder="Diseñadora de Producto" />
            <FormField label="Email" value={data.personal.email} onChange={(v) => updatePersonal({ email: v })} placeholder="maria@email.com" type="email" />
            <FormField label="Teléfono" value={data.personal.phone} onChange={(v) => updatePersonal({ phone: v })} placeholder="+34 612 345 678" type="tel" />
            <FormField label="Ubicación" value={data.personal.location} onChange={(v) => updatePersonal({ location: v })} placeholder="Madrid, España" />
            <FormField label="LinkedIn" value={data.personal.linkedin} onChange={(v) => updatePersonal({ linkedin: v })} placeholder="linkedin.com/in/tu-perfil" />
            <FormField label="GitHub" value={data.personal.github} onChange={(v) => updatePersonal({ github: v })} placeholder="github.com/tu-usuario" />
            <FormField label="Portafolio" value={data.personal.portfolio || ""} onChange={(v) => updatePersonal({ portfolio: v })} placeholder="tuportfolio.com" />
            <FormField label="Sitio web" value={data.personal.website} onChange={(v) => updatePersonal({ website: v })} placeholder="tuweb.com" type="url" />
          </SectionAccordion>

          {/* Summary */}
          <SectionAccordion title="Resumen Profesional" count={data.summary ? 1 : 0} defaultOpen style={{}} sectionId="section-summary" active={activeSection === "summary"}>
            <FormField label="Resumen" value={data.summary} onChange={updateSummary} placeholder="Breve descripción de tu perfil profesional..." type="textarea" />
          </SectionAccordion>

          {/* Experience */}
          <SectionAccordion title="Experiencia" count={data.experience.length} defaultOpen={data.experience.length > 0} style={{}} sectionId="section-experience" active={activeSection === "experience"}>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Educación" count={data.education.length} defaultOpen={data.education.length > 0} style={{}} sectionId="section-education" active={activeSection === "education"}>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Habilidades" count={data.skills.length} defaultOpen={data.skills.length > 0} style={{}} sectionId="section-skills" active={activeSection === "skills"}>
            {data.skills.map((sk) => (
              <div key={sk.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Idiomas" count={data.languages.length} defaultOpen={data.languages.length > 0} style={{}} sectionId="section-languages" active={activeSection === "languages"}>
            {data.languages.map((lang) => (
              <div key={lang.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Proyectos" count={data.projects.length} defaultOpen={data.projects.length > 0} style={{}} sectionId="section-projects" active={activeSection === "projects"}>
            {data.projects.map((proj) => (
              <div key={proj.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Certificaciones" count={data.certifications.length} defaultOpen={data.certifications.length > 0} style={{}} sectionId="section-certifications" active={activeSection === "certifications"}>
            {data.certifications.map((cert) => (
              <div key={cert.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Premios y Honores" count={data.awards.length} defaultOpen={data.awards.length > 0} style={{}} sectionId="section-awards" active={activeSection === "awards"}>
            {data.awards.map((award) => (
              <div key={award.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Licencias y Carnets" count={data.licenses.length} defaultOpen={data.licenses.length > 0} style={{}} sectionId="section-licenses" active={activeSection === "licenses"}>
            {data.licenses.map((lic) => (
              <div key={lic.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Referencias" count={data.references.length} defaultOpen={data.references.length > 0} style={{}} sectionId="section-references" active={activeSection === "references"}>
            {data.references.map((ref) => (
              <div key={ref.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Afiliaciones y Colegios" count={data.affiliations.length} defaultOpen={data.affiliations.length > 0} style={{}} sectionId="section-affiliations" active={activeSection === "affiliations"}>
            {data.affiliations.map((aff) => (
              <div key={aff.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Secciones Personalizadas" count={customSections.length} defaultOpen={false} style={{}} sectionId="section-custom" active={activeSection === "custom"}>
            {customSections.map((cs) => (
              <div key={cs.id} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px", marginBottom: 10, border: "1px solid #E4E2DC" }}>
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
          <SectionAccordion title="Orden de Secciones" defaultOpen={false} style={{}} sectionId="section-order" active={activeSection === "order"}>
            <p style={{ fontSize: 11, color: "#9C9890", margin: "0 0 10px" }}>Usa los botones para reordenar</p>
            {sectionOrder.map((key, idx) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 8px", background: "#FFFFFF", marginBottom: 4, border: "1px solid #E4E2DC" }}>
                <span style={{ fontSize: 10, color: "#9C9890", width: 16, fontWeight: 700 }}>{idx + 1}</span>
                <span style={{ fontSize: 12, flex: 1, color: "#1A1918", fontWeight: 500 }}>{SECTION_LABELS[key] || key}</span>
                <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "#9C9890" }}>
                  <input type="checkbox" checked={data.settings.sections[key] ?? false} onChange={(e) => updateSections({ [key]: e.target.checked })} style={{ width: 14, height: 14, cursor: "pointer" }} />
                  Visible
                </label>
                <button disabled={idx === 0} onClick={() => moveSection(idx, idx - 1)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Subir</button>
                <button disabled={idx === sectionOrder.length - 1} onClick={() => moveSection(idx, idx + 1)} className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10 }}>Bajar</button>
              </div>
            ))}
          </SectionAccordion>

          {/* Design */}
          <SectionAccordion title="Diseño" defaultOpen style={{}} sectionId="section-design" active={activeSection === "design"}>
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
                     cursor: "pointer", boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.1)",
                     transition: "all 150ms ease",
                  }} />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6B6860", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Fuente</label>
              <FontPicker value={data.settings.fontPairing} onChange={updateFontPairing} />
            </div>
          </SectionAccordion>
        </div>
      </aside>

      {/* RIGHT PANEL */}
      <main className="editor-main" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 24px", overflowY: "auto", height: "100vh" }}>
        {/* Toolbar */}
        <div className="editor-toolbar" style={{ display: "flex", gap: 8, marginBottom: 20, width: "100%", maxWidth: previewMode === "mobile" ? 400 : 720, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#6B6860" }}>{TEMPLATES.find((t) => t.id === data.settings.template)?.name}</span>
            <span className="boton-neobrutalista-sm" style={{ padding: "2px 8px", fontSize: 10, boxShadow: "2px 2px 0px 0px #000000" }}>
              {totalPages} página{totalPages !== 1 ? "s" : ""}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 2, border: "1.5px solid #000", borderRadius: 6, padding: 1, background: "#fff", boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.35)" }}>
              <button onClick={zoomOut} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "4px 9px", lineHeight: 1, color: "#1A1918", borderRadius: 4 }} title="Reducir (Ctrl/Cmd + rueda)">
                −
              </button>
              <span style={{ fontSize: 11, fontWeight: 700, minWidth: 36, textAlign: "center", color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>
                {Math.round(zoom * 100)}%
              </span>
              <button onClick={zoomIn} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, padding: "4px 9px", lineHeight: 1, color: "#1A1918", borderRadius: 4 }} title="Ampliar (Ctrl/Cmd + rueda)">
                +
              </button>
               <button onClick={() => setZoom(1)} style={{ border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, padding: "3px 6px", borderRadius: 4, color: "#6B6860", background: "#FFFFFF", fontFamily: "var(--font-instrument), sans-serif" }} title="Restablecer zoom">
                reset
              </button>
            </span>
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
            <button onClick={handleExportPDF} disabled={isExporting} className="boton-neobrutalista boton-neobrutalista-primario" style={{ padding: "6px 12px", fontSize: 11 }}>
              {isExporting ? "Exportando…" : "PDF"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div ref={previewRef} style={{ width: "100%", maxWidth: previewMode === "mobile" ? 375 : 720 }}>
          <div ref={paperZoomRef} className="editor-paper-zoom" style={{ transformOrigin: "top center", margin: "0 auto", width: "fit-content" }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <div key={i} className={previewMode === "mobile" ? "a4-paper-mobile" : "a4-paper"} style={{ overflow: "hidden", position: "relative", marginBottom: "8px", ...(previewMode === "mobile" ? { height: "667px" } : {}) }}>
                <div style={{ position: "absolute", top: previewMode === "mobile" ? `-${i * 667}px` : `-${i * 297}mm`, left: 0, right: 0 }}>
                  {atsMode ? <ATSTemplate data={data} /> : <TemplateRenderer data={data} />}
                </div>
              </div>
            ))}
          </div>
          {/* Medidor oculto: mide la altura real del CV a ancho A4 (794px) para
              generar exactamente las hojas que necesita */}
          <div ref={probeRef} aria-hidden="true" className="cv-measure-probe" style={{ position: "fixed", left: -9999, top: 0, width: 794, pointerEvents: "none", visibility: "hidden" }}>
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

            <div style={{ border: "1px dashed #CBC8C0", borderRadius: 12, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center", marginBottom: 10, background: "#FFFFFF" }}>
              <code style={{ flex: 1, fontSize: 11, color: "#6B6860", wordBreak: "break-all", fontFamily: "var(--font-jetbrains), monospace", maxHeight: 64, overflow: "auto", lineHeight: 1.5 }}>{shareUrl}</code>
              <button onClick={handleCopyShareUrl} className="boton-neobrutalista" style={{ padding: "8px 14px", fontSize: 11, whiteSpace: "nowrap", flexShrink: 0 }} title="Copiar el enlace">
                Copiar
              </button>
            </div>

            <button onClick={handleCopyShareMessage} className="boton-neobrutalista boton-neobrutalista-primario" style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: 12, marginBottom: 8 }}>
              Copiar mensaje listo para WhatsApp
            </button>
            <p style={{ fontSize: 10, color: "#9C9890", margin: "0 0 4px", lineHeight: 1.5 }}>
              Se copia un mensaje con tu nombre ya incluido.
            </p>
            <button onClick={() => setShowShareModal(false)} className="boton-neobrutalista-sm" style={{ marginLeft: "auto", padding: "6px 12px" }}>Cerrar</button>
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
        @media (min-width: 861px) {
          body:has(.editor-root) { overflow: hidden; }
        }
        .a4-paper-mobile {
          width: 375px;
          min-height: 667px;
          background: white;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        @media print {
          @page { size: A4; margin: 0; }
          body * { visibility: hidden !important; }
          .editor-root { height: auto !important; overflow: visible !important; }
          .editor-nav, .editor-aside, .editor-toolbar, .cv-measure-probe { display: none !important; }
          .editor-main { height: auto !important; overflow: visible !important; padding: 0 !important; display: block !important; }
          .editor-paper-zoom { zoom: 1 !important; display: block !important; margin: 0 !important; }
          .a4-paper, .a4-paper-mobile, .a4-paper *, .a4-paper-mobile * { visibility: visible !important; }
          .a4-paper, .a4-paper-mobile {
            position: static !important;
            left: auto !important;
            top: auto !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            box-shadow: none;
            margin: 0;
            padding: 0;
            page-break-after: always;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .a4-paper:last-child {
            page-break-after: auto;
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