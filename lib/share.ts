// lib/share.ts
// Empaquetado del CV para compartir por URL. 100 % cliente: se comprime el
// JSON con claves compactas (una letra por campo) y lz-string en un ?cv=.
// El formato compacto ahorra ~35 % frente a comprimir el JSON completo, y los
// enlaces antiguos (JSON completo comprimido) se siguen leyendo igual.

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import {
  type ResumeData, type ResumeSettings, type SectionKey,
  DEFAULT_RESUME, DEFAULT_SECTION_ORDER,
} from "./types";

// ---------- ids ----------
// Los ids no se comparten (ocupan espacio y no aportan contenido): se
// regeneran al importar.
export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ---------- códigos de sección (orden ATS y visibilidad) ----------
const SEC_CODE: Record<SectionKey, string> = {
  summary: "u", experience: "x", education: "d", skills: "k",
  languages: "g", projects: "j", certifications: "c", awards: "w",
  licenses: "l", references: "r", affiliations: "a",
};
const CODE_SEC: Record<string, SectionKey> = Object.fromEntries(
  Object.entries(SEC_CODE).map(([k, v]) => [v, k as SectionKey])
);

type StrMap = { [k: string]: any };

function pick(obj: StrMap, key: string, val: unknown): StrMap {
  if (val === undefined || val === null || val === "") return obj;
  obj[key] = val;
  return obj;
}
function pickArr(obj: StrMap, key: string, val: unknown[] | undefined): StrMap {
  if (Array.isArray(val) && val.length > 0) obj[key] = val;
  return obj;
}
function objOrUndefined(obj: StrMap): StrMap | undefined {
  return Object.keys(obj).length > 0 ? obj : undefined;
}
function str(o: StrMap | undefined, key: string): string {
  const v = o?.[key];
  return typeof v === "string" ? v : "";
}

// ---------- pack ----------
function packPersonal(p: ResumeData["personal"]): StrMap {
  const o: StrMap = {};
  pick(o, "n", p.name); pick(o, "t", p.title); pick(o, "e", p.email); pick(o, "p", p.phone);
  pick(o, "l", p.location); pick(o, "w", p.website); pick(o, "i", p.linkedin);
  pick(o, "g", p.github); pick(o, "f", p.portfolio);
  return o;
}

// Solo se empaqueta lo que difiere del default: al importar se rellenan los
// valores por defecto, así que el enlace es más corto.
function packSettings(s: ResumeSettings): StrMap | undefined {
  const d = DEFAULT_RESUME.settings;
  const o: StrMap = {};
  if (s.template !== d.template) o.t = s.template;
  if (s.accentColor !== d.accentColor) o.c = s.accentColor;
  if (s.fontPairing !== d.fontPairing) o.f = s.fontPairing;
  if (s.spacing !== d.spacing) o.s = s.spacing;
  if (s.headerLayout !== d.headerLayout) o.h = s.headerLayout;
  // Visibilidad como cadena "1"/"0" en el orden canónico de secciones.
  const vis = DEFAULT_SECTION_ORDER.map((k) => (s.sections[k] ? "1" : "0")).join("");
  if (vis !== "1".repeat(DEFAULT_SECTION_ORDER.length)) o.i = vis;
  // Orden solo si difiere del canónico (afecta a la vista ATS).
  const sameOrder =
    s.sectionOrder.length === DEFAULT_SECTION_ORDER.length &&
    s.sectionOrder.every((k, i) => k === DEFAULT_SECTION_ORDER[i]);
  if (!sameOrder) o.o = s.sectionOrder.map((k) => SEC_CODE[k] || "?").join("");
  return objOrUndefined(o);
}

export function toCompact(data: ResumeData): StrMap {
  const o: StrMap = { p: packPersonal(data.personal) };
  pick(o, "m", data.summary);

  pickArr(o, "x", data.experience.map((e) => {
    const it: StrMap = {};
    pick(it, "c", e.company); pick(it, "o", e.position); pick(it, "s", e.startDate);
    pick(it, "d", e.endDate); pick(it, "r", e.description);
    return it;
  }));

  pickArr(o, "d", data.education.map((e) => {
    const it: StrMap = {};
    pick(it, "i", e.institution); pick(it, "d", e.degree); pick(it, "s", e.startDate); pick(it, "e", e.endDate);
    return it;
  }));

  pickArr(o, "k", data.skills.map((e) => {
    const it: StrMap = {};
    pick(it, "c", e.category); pickArr(it, "i", e.items);
    return it;
  }));

  pickArr(o, "g", data.languages.map((e) => {
    const it: StrMap = {};
    pick(it, "l", e.language); pick(it, "v", e.level);
    return it;
  }));

  pickArr(o, "j", data.projects.map((e) => {
    const it: StrMap = {};
    pick(it, "n", e.name); pick(it, "d", e.description); pick(it, "u", e.url);
    return it;
  }));

  pickArr(o, "c", data.certifications.map((e) => {
    const it: StrMap = {};
    pick(it, "n", e.name); pick(it, "i", e.issuer); pick(it, "d", e.date);
    return it;
  }));

  pickArr(o, "w", data.awards.map((e) => {
    const it: StrMap = {};
    pick(it, "n", e.name); pick(it, "i", e.issuer); pick(it, "d", e.date);
    return it;
  }));

  pickArr(o, "l", data.licenses.map((e) => {
    const it: StrMap = {};
    pick(it, "n", e.name); pick(it, "i", e.issuer); pick(it, "d", e.date); pick(it, "k", e.licenseNumber);
    return it;
  }));

  pickArr(o, "r", data.references.map((e) => {
    const it: StrMap = {};
    pick(it, "n", e.name); pick(it, "c", e.company); pick(it, "p", e.phone);
    pick(it, "e", e.email); pick(it, "r", e.relationship);
    return it;
  }));

  pickArr(o, "a", data.affiliations.map((e) => {
    const it: StrMap = {};
    pick(it, "o", e.organization); pick(it, "r", e.role); pick(it, "s", e.startDate); pick(it, "e", e.endDate);
    return it;
  }));

  pickArr(o, "q", data.customSections.map((e) => {
    const it: StrMap = {};
    pick(it, "t", e.title); pick(it, "c", e.content); pick(it, "o", e.order);
    return it;
  }));

  const st = packSettings(data.settings);
  if (st) o.s = st;
  return o;
}

// Genera el valor del parámetro ?cv=, listo para meter en la URL.
export function packCV(data: ResumeData): string {
  const json = JSON.stringify(toCompact(data));
  // El alfabeto URI-safe de lz-string incluye "+", que en una query string se
  // decodifica como espacio: hay que escaparlo (%2B).
  return compressToEncodedURIComponent(json).replace(/\+/g, "%2B");
}

// ---------- unpack ----------
function unpackArrays(raw: unknown): any[] {
  return Array.isArray(raw) ? raw : [];
}

export function fromCompact(o: StrMap): ResumeData {
  const d = DEFAULT_RESUME;
  const cs = o.s || {};

  // Visibilidad y orden (con los valores canónicos por defecto).
  const sections: ResumeSettings["sections"] = { ...d.settings.sections };
  const vis = typeof cs.i === "string" ? cs.i : "";
  if (vis.length === DEFAULT_SECTION_ORDER.length) {
    DEFAULT_SECTION_ORDER.forEach((key, i) => { sections[key] = vis[i] === "1"; });
  }
  let sectionOrder: SectionKey[] = [...DEFAULT_SECTION_ORDER];
  if (typeof cs.o === "string" && cs.o.length > 0) {
    const mapped = cs.o.split("").map((c: string) => CODE_SEC[c]).filter(Boolean) as SectionKey[];
    if (mapped.length > 0) sectionOrder = mapped;
  }

  const settings: ResumeSettings = {
    template: (cs.t as ResumeSettings["template"]) || d.settings.template,
    accentColor: typeof cs.c === "string" ? cs.c : d.settings.accentColor,
    fontPairing: (cs.f as ResumeSettings["fontPairing"]) || d.settings.fontPairing,
    spacing: (cs.s as ResumeSettings["spacing"]) || d.settings.spacing,
    headerLayout: (cs.h as ResumeSettings["headerLayout"]) || d.settings.headerLayout,
    sections,
    sectionOrder,
  };

  const p = o.p || {};
  const personal: ResumeData["personal"] = {
    ...d.personal,
    name: str(p, "n"), title: str(p, "t"), email: str(p, "e"), phone: str(p, "p"),
    location: str(p, "l"), website: str(p, "w"), linkedin: str(p, "i"), github: str(p, "g"),
  };
  const portfolio = str(p, "f");
  if (portfolio) personal.portfolio = portfolio;

  const data: ResumeData = {
    ...d,
    personal,
    settings,
    experience: unpackArrays(o.x).map((e) => ({
      id: newId(), company: str(e, "c"), position: str(e, "o"),
      startDate: str(e, "s"), endDate: str(e, "d"), description: str(e, "r"),
    })),
    education: unpackArrays(o.d).map((e) => ({
      id: newId(), institution: str(e, "i"), degree: str(e, "d"),
      startDate: str(e, "s"), endDate: str(e, "e"),
    })),
    skills: unpackArrays(o.k).map((e) => ({
      id: newId(), category: str(e, "c"),
      items: Array.isArray(e.i) ? e.i.filter((x: unknown) => typeof x === "string") : [],
    })),
    languages: unpackArrays(o.g).map((e) => ({
      id: newId(), language: str(e, "l"), level: str(e, "v"),
    })),
    projects: unpackArrays(o.j).map((e) => ({
      id: newId(), name: str(e, "n"), description: str(e, "d"), url: str(e, "u"),
    })),
    certifications: unpackArrays(o.c).map((e) => ({
      id: newId(), name: str(e, "n"), issuer: str(e, "i"), date: str(e, "d"),
    })),
    awards: unpackArrays(o.w).map((e) => ({
      id: newId(), name: str(e, "n"), issuer: str(e, "i"), date: str(e, "d"),
    })),
    licenses: unpackArrays(o.l).map((e) => {
      const lic: ResumeData["licenses"][number] = {
        id: newId(), name: str(e, "n"), issuer: str(e, "i"), date: str(e, "d"),
      };
      const num = str(e, "k");
      if (num) lic.licenseNumber = num;
      return lic;
    }),
    references: unpackArrays(o.r).map((e) => ({
      id: newId(), name: str(e, "n"), company: str(e, "c"), phone: str(e, "p"),
      email: str(e, "e"), relationship: str(e, "r"),
    })),
    affiliations: unpackArrays(o.a).map((e) => ({
      id: newId(), organization: str(e, "o"), role: str(e, "r"),
      startDate: str(e, "s"), endDate: str(e, "e"),
    })),
    customSections: unpackArrays(o.q).map((e) => ({
      id: newId(), title: str(e, "t"), content: str(e, "c"),
      order: typeof e.o === "number" ? e.o : 0,
    })),
  };
  return data;
}

// Enlaces antiguos: JSON completo (con ids y nombre de campos largos).
function normalizeLegacy(obj: ResumeData): ResumeData {
  const d = DEFAULT_RESUME;
  const data: ResumeData = {
    ...d,
    ...obj,
    personal: { ...d.personal, ...(obj.personal || {}) },
    settings: {
      ...d.settings,
      ...(obj.settings || {}),
      sections: { ...d.settings.sections, ...(obj.settings?.sections || {}) },
    },
    customSections: Array.isArray(obj.customSections) ? obj.customSections : [],
  };
  const arrayFields = [
    "experience", "education", "skills", "languages", "projects",
    "certifications", "awards", "licenses", "references", "affiliations",
  ];
  for (const key of arrayFields) {
    if (!Array.isArray((data as unknown as Record<string, unknown>)[key])) {
      (data as unknown as Record<string, unknown>)[key] = [];
    }
  }
  if (!Array.isArray(data.settings.sectionOrder) || data.settings.sectionOrder.length === 0) {
    data.settings.sectionOrder = [...d.settings.sectionOrder];
  }
  return data;
}

// Descomprime y normaliza el payload de `?cv=` (formato compacto actual o
// enlaces antiguos). Devuelve null si no es un CV válido.
export function unpackCV(encoded: string): ResumeData | null {
  if (!encoded) return null;
  // El payload puede llegar con el "+" ya decodificado (URLSearchParams lo
  // convierte) o con el escape %2B intacto (p. ej. si se copió a medias):
  // probar ambas variantes.
  const variants = [encoded];
  if (encoded.includes("%2B")) variants.push(encoded.replace(/%2B/g, "+"));

  for (const variant of variants) {
    let json = "";
    try {
      json = decompressFromEncodedURIComponent(variant) || "";
    } catch {
      json = "";
    }
    if (!json) {
      try { json = decodeURIComponent(variant); } catch { continue; }
    }
    if (!json) continue;
    let parsed: unknown;
    try { parsed = JSON.parse(json); } catch { continue; }
    if (!parsed || typeof parsed !== "object") continue;
    const o = parsed as StrMap;
    if (o && typeof o.p === "object" && o.p !== null && !o.personal) {
      try { return fromCompact(o); } catch { continue; }
    }
    if (o && typeof o.personal === "object" && o.personal !== null && typeof o.settings === "object") {
      try { return normalizeLegacy(o as unknown as ResumeData); } catch { continue; }
    }
  }
  return null;
}