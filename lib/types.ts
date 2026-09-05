export type TemplateId = "minimal" | "editorial" | "modern" | "classic";

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
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

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  settings: {
    template: TemplateId;
    accentColor: string;
    spacing: "compact" | "normal" | "relaxed";
    sections: {
      summary: boolean;
      experience: boolean;
      education: boolean;
      skills: boolean;
      languages: boolean;
      projects: boolean;
    };
  };
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
  summary: "Diseñadora de producto con más de 6 años de experiencia creando interfaces digitales centradas en el usuario. Especializada en sistemas de diseño, metodologías ágiles y accesibilidad web. Apasionada por la intersección entre tecnología y diseño humanizado.",
  experience: [
    {
      id: "1",
      company: "Stripe",
      position: "Senior Product Designer",
      startDate: "Ene 2022",
      endDate: "Presente",
      description: "Lideré el redesign del dashboard de pagos procesamiento de +40k transacciones diarias. Implementé un sistema de diseño escalable que redujo el tiempo de desarrollo de nuevas features en un 35%.",
    },
    {
      id: "2",
      company: "Typeform",
      position: "Product Designer",
      startDate: "Mar 2019",
      endDate: "Dic 2021",
      description: "Diseñé flujos de onboarding que mejoraron la conversión de trial a paid en un 22%. Colaboré con ingeniería en la creación de componentes accesibles para la biblioteca core.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "ESADE",
      degree: "Máster en Diseño Digital y Experiencia de Usuario",
      startDate: "2017",
      endDate: "2019",
    },
    {
      id: "2",
      institution: "Universidad Complutense de Madrid",
      degree: "Grado en Bellas Artes",
      startDate: "2013",
      endDate: "2017",
    },
  ],
  skills: [
    { id: "1", category: "Diseño", items: ["Figma", "Sketch", "Prototyping", "Design Systems", "User Research"] },
    { id: "2", category: "Frontend", items: ["HTML/CSS", "React", "TypeScript", "Tailwind CSS"] },
    { id: "3", category: "Metodologías", items: ["Agile/Scrum", "Design Thinking", "A/B Testing"] },
  ],
  languages: [
    { id: "1", language: "Español", level: "Nativo" },
    { id: "2", language: "Inglés", level: "C2 — Fluido" },
    { id: "3", language: "Francés", level: "B2 — Intermedio alto" },
  ],
  projects: [
    {
      id: "1",
      name: "Sistema de Diseño A11Y",
      description: "Biblioteca de componentes accesibles para React usada internamente en 3 productos de Stripe.",
      url: "github.com/mariagarcia/a11y-design-system",
    },
  ],
  settings: {
    template: "minimal",
    accentColor: "#C0392B",
    spacing: "normal" as const,
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      languages: true,
      projects: true,
    },
  },
};

export const SPACING_MAP: Record<string, number> = {
  compact: 0.85,
  normal: 1,
  relaxed: 1.15,
};

export const TEMPLATES: { id: TemplateId; name: string; description: string; accent: string; bg: string }[] = [
  { id: "minimal", name: "Minimal", description: "Blanco puro, tipografía limpia", accent: "#1A1918", bg: "#FFFFFF" },
  { id: "editorial", name: "Editorial", description: "Dos columnas, serif elegante", accent: "#C0392B", bg: "#FAFAFA" },
  { id: "modern", name: "Modern", description: "Header bold, diseño funcional", accent: "#2563EB", bg: "#F8FAFC" },
  { id: "classic", name: "Classic", description: "Template tradicional profesional", accent: "#374151", bg: "#FFFFFF" },
];
