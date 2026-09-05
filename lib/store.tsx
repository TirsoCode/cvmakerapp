"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { type ResumeData, DEFAULT_RESUME, type TemplateId } from "./types";

const STORE_KEY = "resumaker_data";

interface ResumeContextValue {
  data: ResumeData;
  updatePersonal: (p: Partial<ResumeData["personal"]>) => void;
  updateSummary: (s: string) => void;
  updateExperience: (exp: ResumeData["experience"]) => void;
  updateEducation: (edu: ResumeData["education"]) => void;
  updateSkills: (skills: ResumeData["skills"]) => void;
  updateLanguages: (langs: ResumeData["languages"]) => void;
  updateProjects: (projects: ResumeData["projects"]) => void;
  updateTemplate: (t: TemplateId) => void;
  updateAccentColor: (c: string) => void;
  resetData: () => void;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ResumeData;
        setData({ ...DEFAULT_RESUME, ...parsed, settings: { ...DEFAULT_RESUME.settings, ...parsed.settings } });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch {}
  }, [data, hydrated]);

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

  const updateTemplate = useCallback((template: TemplateId) => {
    setData((d) => ({ ...d, settings: { ...d.settings, template } }));
  }, []);

  const updateAccentColor = useCallback((accentColor: string) => {
    setData((d) => ({ ...d, settings: { ...d.settings, accentColor } }));
  }, []);

  const resetData = useCallback(() => {
    setData(DEFAULT_RESUME);
  }, []);

  return (
    <ResumeContext.Provider value={{
      data, updatePersonal, updateSummary, updateExperience, updateEducation,
      updateSkills, updateLanguages, updateProjects, updateTemplate, updateAccentColor, resetData,
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
