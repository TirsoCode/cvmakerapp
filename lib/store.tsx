"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { type ResumeData, DEFAULT_RESUME, type TemplateId } from "./types";

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
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);

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

  return (
    <ResumeContext.Provider value={{
      data, updatePersonal, updateSummary, updateExperience, updateEducation,
      updateSkills, updateLanguages, updateProjects, updateCertifications, updateAwards,
      updateLicenses, updateReferences, updateAffiliations,
      updateTemplate, updateAccentColor, updateFontPairing, updateSpacing, updateShowPhoto,
      updateSections, resetData,
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
