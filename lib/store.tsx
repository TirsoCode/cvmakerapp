"use client";
import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import {
  type ResumeData, DEFAULT_RESUME, type TemplateId, type CustomSection,
  type SectionKey, type ValidationIssue, type ValidationSeverity,
} from "./types";

export interface CVEntry {
  id: string;
  name: string;
  updatedAt: number;
  data: ResumeData;
}

interface ResumeContextValue {
  data: ResumeData;
  updatePersonal: (p: Partial<ResumeData["personal"]>) => void;
  updateSummary: (s: string) => void;
  updateExperience: (exp: ResumeData["experience"]) => void;
  updateEducation: (edu: ResumeData["education"]) => void;
  updateSkills: (skills: ResumeData["skills"]) => void;
  updateLanguages: (langs: ResumeData["languages"]) => void;
  updateProjects: (projects: ResumeData["projects"]) => void;
  updateCertifications: (certifications: ResumeData["certifications"]) => void;
  updateAwards: (awards: ResumeData["awards"]) => void;
  updateLicenses: (licenses: ResumeData["licenses"]) => void;
  updateReferences: (references: ResumeData["references"]) => void;
  updateAffiliations: (affiliations: ResumeData["affiliations"]) => void;
  updateTemplate: (t: TemplateId) => void;
  updateAccentColor: (c: string) => void;
  updateFontPairing: (f: ResumeData["settings"]["fontPairing"]) => void;
  updateSpacing: (s: ResumeData["settings"]["spacing"]) => void;
  updateShowPhoto: (v: boolean) => void;
  updateSections: (s: Partial<ResumeData["settings"]["sections"]>) => void;
  resetData: () => void;
  customSections: CustomSection[];
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, patch: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  sectionOrder: SectionKey[];
  setSectionOrder: (order: SectionKey[]) => void;
  moveSection: (from: number, to: number) => void;
  cvList: CVEntry[];
  currentCvId: string;
  createNewCv: (data?: ResumeData) => void;
  selectCv: (id: string) => void;
  duplicateCv: (id: string) => void;
  deleteCv: (id: string) => void;
  renameCv: (id: string, name: string) => void;
  validate: () => ValidationIssue[];
  pageEstimate: number;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

const STORAGE_KEY = "cvmaker_cvs";
const STORAGE_VER_KEY = "cvmaker_version";
const CURRENT_VERSION = 1;

function loadCVs(): CVEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CVEntry[];
  } catch {
    return [];
  }
}

function saveCVs(cvs: CVEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvs));
    localStorage.setItem(STORAGE_VER_KEY, String(CURRENT_VERSION));
  } catch {
    // localStorage full or unavailable
  }
}

function migrateData(d: ResumeData): ResumeData {
  const patched = { ...d };
  if (!patched.settings) patched.settings = { ...DEFAULT_RESUME.settings };
  if (!patched.settings.sectionOrder) patched.settings.sectionOrder = [...DEFAULT_RESUME.settings.sectionOrder] as SectionKey[];
  if (!patched.customSections) patched.customSections = [];
  if (!patched.settings.sections) patched.settings.sections = { ...DEFAULT_RESUME.settings.sections };
  return patched;
}

function estimatePages(data: ResumeData): number {
  let lines = 0;
  if (data.personal.name) lines += 2;
  if (data.personal.title) lines += 1;
  if (data.personal.email || data.personal.phone || data.personal.location) lines += 1;
  if (data.personal.linkedin || data.personal.github || data.personal.portfolio) lines += 1;
  if (data.personal.photo && data.settings.showPhoto) lines += 3;
  if (data.summary) lines += Math.ceil(data.summary.length / 80) + 2;
  if (data.experience.length > 0) {
    lines += 2;
    data.experience.forEach((e) => {
      lines += 2;
      if (e.description) lines += Math.ceil(e.description.length / 80);
    });
  }
  if (data.education.length > 0) lines += data.education.length * 2 + 2;
  if (data.skills.length > 0) lines += data.skills.length + 2;
  if (data.languages.length > 0) lines += Math.ceil(data.languages.length / 3) + 2;
  if (data.projects.length > 0) lines += data.projects.length * 2 + 2;
  if (data.certifications.length > 0) lines += data.certifications.length + 2;
  if (data.awards.length > 0) lines += data.awards.length + 2;
  if (data.licenses.length > 0) lines += data.licenses.length + 2;
  if (data.references.length > 0) lines += data.references.length * 2 + 2;
  if (data.affiliations.length > 0) lines += data.affiliations.length + 2;
  if (data.customSections?.length) {
    data.customSections.forEach((cs) => {
      lines += 2 + Math.ceil(cs.content.length / 80);
    });
  }
  const linesPerPage = data.settings.spacing === "compact" ? 65 : data.settings.spacing === "relaxed" ? 48 : 56;
  return Math.max(1, Math.ceil(lines / linesPerPage));
}

function validateData(data: ResumeData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const sev = (field: string, msg: string, s: ValidationSeverity = "warning") => issues.push({ field, message: msg, severity: s });
  if (!data.personal.name?.trim()) sev("personal.name", "El nombre es obligatorio", "error");
  if (!data.personal.email?.trim()) sev("personal.email", "El email es recomendado", "warning");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personal.email)) sev("personal.email", "Formato de email inválido", "error");
  if (!data.personal.phone?.trim()) sev("personal.phone", "El teléfono es recomendado", "warning");
  if (!data.summary?.trim()) sev("summary", "Un resumen profesional mejora tu CV", "warning");
  if (data.experience.length === 0 && data.education.length === 0) sev("experience", "Añade experiencia o educación", "warning");
  data.experience.forEach((exp, i) => {
    if (!exp.company?.trim()) sev(`experience[${i}].company`, `Experiencia ${i + 1}: falta empresa`, "warning");
    if (!exp.position?.trim()) sev(`experience[${i}].position`, `Experiencia ${i + 1}: falta puesto`, "warning");
  });
  return issues;
}

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [cvList, setCvList] = useState<CVEntry[]>([]);
  const [currentCvId, setCurrentCvId] = useState<string>("");
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);
  const initialized = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadCVs();
    if (saved.length > 0) {
      const migrated = saved.map((cv) => ({ ...cv, data: migrateData(cv.data) }));
      setCvList(migrated);
      setCurrentCvId(migrated[0].id);
      setData(migrated[0].data);
    } else {
      const id = uid();
      const entry: CVEntry = { id, name: "Mi CV", updatedAt: Date.now(), data: DEFAULT_RESUME };
      setCvList([entry]);
      setCurrentCvId(id);
      setData(DEFAULT_RESUME);
    }
    initialized.current = true;
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!initialized.current) return;
    if (!currentCvId) return;
    setCvList((prev) => {
      const next = prev.map((cv) =>
        cv.id === currentCvId ? { ...cv, data, updatedAt: Date.now() } : cv
      );
      saveCVs(next);
      return next;
    });
  }, [data, currentCvId]);

  const updatePersonal = useCallback((p: Partial<ResumeData["personal"]>) => {
    setData((d) => ({ ...d, personal: { ...d.personal, ...p } }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setData((d) => ({ ...d, summary }));
  }, []);

  const updateExperience = useCallback((experience: ResumeData["experience"]) => {
    setData((d) => ({ ...d, experience }));
  }, []);

  const updateEducation = useCallback((education: ResumeData["education"]) => {
    setData((d) => ({ ...d, education }));
  }, []);

  const updateSkills = useCallback((skills: ResumeData["skills"]) => {
    setData((d) => ({ ...d, skills }));
  }, []);

  const updateLanguages = useCallback((languages: ResumeData["languages"]) => {
    setData((d) => ({ ...d, languages }));
  }, []);

  const updateProjects = useCallback((projects: ResumeData["projects"]) => {
    setData((d) => ({ ...d, projects }));
  }, []);

  const updateCertifications = useCallback((certifications: ResumeData["certifications"]) => {
    setData((d) => ({ ...d, certifications }));
  }, []);

  const updateAwards = useCallback((awards: ResumeData["awards"]) => {
    setData((d) => ({ ...d, awards }));
  }, []);

  const updateLicenses = useCallback((licenses: ResumeData["licenses"]) => {
    setData((d) => ({ ...d, licenses }));
  }, []);

  const updateReferences = useCallback((references: ResumeData["references"]) => {
    setData((d) => ({ ...d, references }));
  }, []);

  const updateAffiliations = useCallback((affiliations: ResumeData["affiliations"]) => {
    setData((d) => ({ ...d, affiliations }));
  }, []);

  const updateTemplate = useCallback((template: TemplateId) => {
    setData((d) => ({ ...d, settings: { ...d.settings, template } }));
  }, []);

  const updateAccentColor = useCallback((accentColor: string) => {
    setData((d) => ({ ...d, settings: { ...d.settings, accentColor } }));
  }, []);

  const updateFontPairing = useCallback((fontPairing: ResumeData["settings"]["fontPairing"]) => {
    setData((d) => ({ ...d, settings: { ...d.settings, fontPairing } }));
  }, []);

  const updateSpacing = useCallback((spacing: ResumeData["settings"]["spacing"]) => {
    setData((d) => ({ ...d, settings: { ...d.settings, spacing } }));
  }, []);

  const updateShowPhoto = useCallback((showPhoto: boolean) => {
    setData((d) => ({ ...d, settings: { ...d.settings, showPhoto } }));
  }, []);

  const updateSections = useCallback((sections: Partial<ResumeData["settings"]["sections"]>) => {
    setData((d) => ({ ...d, settings: { ...d.settings, sections: { ...d.settings.sections, ...sections } } }));
  }, []);

  const resetData = useCallback(() => {
    setData(DEFAULT_RESUME);
  }, []);

  // Custom sections
  const addCustomSection = useCallback((title: string) => {
    setData((d) => ({
      ...d,
      customSections: [...(d.customSections || []), { id: uid(), title, content: "", order: (d.customSections?.length || 0) }],
    }));
  }, []);

  const updateCustomSection = useCallback((id: string, patch: Partial<CustomSection>) => {
    setData((d) => ({
      ...d,
      customSections: (d.customSections || []).map((cs) => (cs.id === id ? { ...cs, ...patch } : cs)),
    }));
  }, []);

  const removeCustomSection = useCallback((id: string) => {
    setData((d) => ({
      ...d,
      customSections: (d.customSections || []).filter((cs) => cs.id !== id),
    }));
  }, []);

  // Section ordering
  const setSectionOrder = useCallback((sectionOrder: SectionKey[]) => {
    setData((d) => ({ ...d, settings: { ...d.settings, sectionOrder } }));
  }, []);

  const moveSection = useCallback((from: number, to: number) => {
    setData((d) => {
      const order = [...d.settings.sectionOrder];
      const [moved] = order.splice(from, 1);
      order.splice(to, 0, moved);
      return { ...d, settings: { ...d.settings, sectionOrder: order } };
    });
  }, []);

  // Multi-CV management
  const createNewCv = useCallback((candidate?: ResumeData) => {
    const id = uid();
    const initial = candidate ? migrateData(candidate) : { ...DEFAULT_RESUME };
    const entry: CVEntry = { id, name: candidate?.personal?.name ? `${candidate.personal.name}'s CV` : "Nuevo CV", updatedAt: Date.now(), data: initial };
    setCvList((prev) => {
      const next = [...prev, entry];
      saveCVs(next);
      return next;
    });
    setCurrentCvId(id);
    setData(initial);
  }, []);

  const selectCv = useCallback((id: string) => {
    setCvList((prev) => {
      const found = prev.find((cv) => cv.id === id);
      if (found) {
        setCurrentCvId(id);
        setData(found.data);
      }
      return prev;
    });
  }, []);

  const duplicateCv = useCallback((id: string) => {
    setCvList((prev) => {
      const source = prev.find((cv) => cv.id === id);
      if (!source) return prev;
      const newId = uid();
      const dup: CVEntry = {
        id: newId,
        name: source.name + " (copia)",
        updatedAt: Date.now(),
        data: JSON.parse(JSON.stringify(source.data)),
      };
      const next = [...prev, dup];
      saveCVs(next);
      return next;
    });
  }, []);

  const deleteCv = useCallback((id: string) => {
    setCvList((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((cv) => cv.id !== id);
      saveCVs(next);
      if (currentCvId === id && next.length > 0) {
        setCurrentCvId(next[0].id);
        setData(next[0].data);
      }
      return next;
    });
  }, [currentCvId]);

  const renameCv = useCallback((id: string, name: string) => {
    setCvList((prev) => {
      const next = prev.map((cv) => (cv.id === id ? { ...cv, name } : cv));
      saveCVs(next);
      return next;
    });
  }, []);

  const validate = useCallback(() => validateData(data), [data]);
  const pageEstimate = estimatePages(data);

  return (
    <ResumeContext.Provider value={{
      data, updatePersonal, updateSummary, updateExperience, updateEducation,
      updateSkills, updateLanguages, updateProjects, updateCertifications, updateAwards,
      updateLicenses, updateReferences, updateAffiliations,
      updateTemplate, updateAccentColor, updateFontPairing, updateSpacing, updateShowPhoto,
      updateSections, resetData,
      customSections: data.customSections || [],
      addCustomSection, updateCustomSection, removeCustomSection,
      sectionOrder: data.settings.sectionOrder || [...DEFAULT_RESUME.settings.sectionOrder],
      setSectionOrder, moveSection,
      cvList, currentCvId, createNewCv, selectCv, duplicateCv, deleteCv, renameCv,
      validate, pageEstimate,
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
