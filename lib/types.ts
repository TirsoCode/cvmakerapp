export type TemplateId =
  | "minimal" | "editorial" | "modern" | "classic"
  | "prussian" | "cascade" | "artisan" | "glacier"
  | "ember" | "obsidian" | "ivory" | "cedar"
  | "slate" | "sand" | "plum" | "meridian"
  | "carbon" | "aurora" | "versa" | "opus";

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo?: string;
  portfolio?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface AwardItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface LicenseItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  licenseNumber?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface InstrumentItem {
  id: string;
  instrument: string;
  level: string;
}

export interface AffiliationItem {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
}

export type Spacing = "compact" | "normal" | "relaxed";
export type FontPairing = "default" | "serif" | "mono" | "display";

export interface SectionVisibility {
  summary: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  languages: boolean;
  projects: boolean;
  certifications: boolean;
  awards: boolean;
  licenses: boolean;
  references: boolean;
  affiliations: boolean;
}

export interface ResumeSettings {
  template: TemplateId;
  accentColor: string;
  fontPairing: FontPairing;
  spacing: Spacing;
  showPhoto: boolean;
  headerLayout: "centered" | "left" | "sidebar";
  sections: SectionVisibility;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  licenses: LicenseItem[];
  references: ReferenceItem[];
  affiliations: AffiliationItem[];
  settings: ResumeSettings;
}

export const DEFAULT_RESUME: ResumeData = {
  personal: {
    name: "María García López",
    title: "Diseñadora de Producto",
    email: "maria.garcia@email.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    website: "",
    linkedin: "linkedin.com/in/mariagarcia",
    github: "github.com/mariagarcia",
  },
  summary: "Diseñadora de producto con más de 6 años de experiencia creando interfaces digitales centradas en el usuario. Especializada en sistemas de diseño, metodologías ágiles y accesibilidad web.",
  experience: [
    {
      id: "1", company: "Stripe", position: "Senior Product Designer",
      startDate: "Ene 2022", endDate: "Presente",
      description: "Lideré el redesign del dashboard de pagos. Implementé un sistema de diseño escalable que redujo el tiempo de desarrollo en un 35%.",
    },
    {
      id: "2", company: "Typeform", position: "Product Designer",
      startDate: "Mar 2019", endDate: "Dic 2021",
      description: "Diseñé flujos de onboarding que mejoraron la conversión de trial a paid en un 22%.",
    },
  ],
  education: [
    { id: "1", institution: "ESADE", degree: "Máster en Diseño Digital", startDate: "2017", endDate: "2019" },
    { id: "2", institution: "UCM", degree: "Grado en Bellas Artes", startDate: "2013", endDate: "2017" },
  ],
  skills: [
    { id: "1", category: "Diseño", items: ["Figma", "Sketch", "Prototyping", "Design Systems"] },
    { id: "2", category: "Frontend", items: ["React", "TypeScript", "CSS", "Tailwind"] },
    { id: "3", category: "Metodologías", items: ["Agile", "Design Thinking", "A/B Testing"] },
  ],
  languages: [
    { id: "1", language: "Español", level: "Nativo" },
    { id: "2", language: "Inglés", level: "C2 — Fluido" },
    { id: "3", language: "Francés", level: "B2" },
  ],
  projects: [
    { id: "1", name: "Sistema de Diseño A11Y", description: "Biblioteca de componentes accesibles para React.", url: "github.com/mariagarcia/a11y" },
  ],
  certifications: [
    { id: "1", name: "Google UX Design Certificate", issuer: "Google / Coursera", date: "2023" },
  ],
  awards: [
    { id: "1", name: "Best Mobile Experience Award", issuer: "Awwwards", date: "2024" },
  ],
  licenses: [],
  references: [],
  affiliations: [],
  settings: {
    template: "minimal",
    accentColor: "#1A1918",
    fontPairing: "default",
    spacing: "normal",
    showPhoto: false,
    headerLayout: "left",
    sections: {
      summary: true, experience: true, education: true,
      skills: true, languages: true, projects: true,
      certifications: true, awards: true, licenses: true,
      references: true, affiliations: true,
    },
  },
};

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
  bg: string;
  tags: string[];
}

export const TEMPLATES: TemplateInfo[] = [
  { id: "minimal",   name: "Minimal",    description: "Blanco puro, tipografía limpia",            accent: "#1A1918", bg: "#FFFFFF", tags: ["clean", "sans"] },
  { id: "editorial", name: "Editorial",   description: "Sidebar oscuro, dos columnas, serif",        accent: "#C0392B", bg: "#FFFFFF", tags: ["two-col", "serif"] },
  { id: "modern",    name: "Modern",    description: "Header bold, barras de color",             accent: "#2563EB", bg: "#FFFFFF", tags: ["bold", "tech"] },
  { id: "classic",   name: "Classic",   description: "Centrado, serif, separadores horizontales", accent: "#374151", bg: "#FFFFFF", tags: ["traditional", "serif"] },
  { id: "prussian",   name: "Prussian",   description: "Azul profundo, estructura rígida",           accent: "#1E3A5F", bg: "#FFFFFF", tags: ["corporate", "blue"] },
  { id: "cascade",   name: "Cascade",    description: "Barra gradient top, limpio",               accent: "#0891B2", bg: "#FFFFFF", tags: ["gradient", "fresh"] },
  { id: "artisan",   name: "Artisan",    description: "Tonos tierra, craft, cálido",             accent: "#92400E", bg: "#FFFDF8", tags: ["warm", "earth"] },
  { id: "glacier",   name: "Glacier",   description: "Azul hielo, líneas finas, frozen",         accent: "#0369A1", bg: "#F0F9FF", tags: ["cool", "minimal"] },
  { id: "ember",     name: "Ember",      description: "Rojo-naranja cálido, energético",          accent: "#DC2626", bg: "#FFFFFF", tags: ["bold", "warm"] },
  { id: "obsidian",  name: "Obsidian",   description: "Negro profundo, máximo contraste",        accent: "#18181B", bg: "#FAFAFA", tags: ["dark", "bold"] },
  { id: "ivory",     name: "Ivory",      description: "Crema elegante, serif delicado",          accent: "#78716C", bg: "#FDFDFA", tags: ["elegant", "light"] },
  { id: "cedar",     name: "Cedar",      description: "Marrón verde, naturaleza, orgánico",       accent: "#4D7C0F", bg: "#FDFDF0", tags: ["earth", "organic"] },
  { id: "slate",     name: "Slate",      description: "Gris-azul corporativo, estable",         accent: "#475569", bg: "#F8FAFC", tags: ["corporate", "gray"] },
  { id: "sand",      name: "Sand",       description: "Beige cálido, minimalista calmado",         accent: "#B45309", bg: "#FBF9F4", tags: ["warm", "calm"] },
  { id: "plum",      name: "Plum",       description: "Púrpura profundo, creativo",             accent: "#7C3AED", bg: "#FAF5FF", tags: ["creative", "purple"] },
  { id: "meridian",  name: "Meridian",   description: "Teal-verde fresco, moderno",            accent: "#0D9488", bg: "#F0FDFA", tags: ["fresh", "modern"] },
  { id: "carbon",    name: "Carbon",     description: "Monocromo extremo, ultra-minimal",         accent: "#111111", bg: "#FFFFFF", tags: ["minimal", "mono"] },
  { id: "aurora",    name: "Aurora",     description: "Verde esmeralda, limpio y profesional",  accent: "#059669", bg: "#ECFDF5", tags: ["fresh", "green"] },
  { id: "versa",     name: "Versa",      description: "Rojo cereza, moderno y versátil",         accent: "#BE123C", bg: "#FFFFFF", tags: ["bold", "modern"] },
  { id: "opus",      name: "Opus",       description: "Dorado ámbar, editorial y bold",         accent: "#CA8A04", bg: "#FEFCE8", tags: ["editorial", "bold"] },
];

export const FONT_PAIRINGS: { id: FontPairing; name: string; heading: string; body: string }[] = [
  { id: "default",  name: "Modern",    heading: "var(--font-instrument), system-ui",    body: "var(--font-instrument), system-ui" },
  { id: "serif",   name: "Classic",   heading: "var(--font-playfair), Georgia, serif", body: "var(--font-source), Georgia, serif" },
  { id: "mono",    name: "Tech",      heading: "var(--font-space), system-ui",      body: "var(--font-jetbrains), monospace" },
  { id: "display", name: "Display",   heading: "var(--font-fraunces), Georgia, serif",       body: "var(--font-dm), system-ui" },
];

export const SPACING_MAP: Record<Spacing, number> = {
  compact: 0.85,
  normal: 1,
  relaxed: 1.2,
};
