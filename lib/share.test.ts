// Tests del empaquetado de enlaces compartidos (lib/share.ts).
// Ejecutar con: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { compressToEncodedURIComponent } from "lz-string";
import { packCV, unpackCV } from "./share";
import { DEFAULT_RESUME, type ResumeData } from "./types";

// Simula el flujo real: URLSearchParams decodifica %2B -> "+".
function simulaParametro(payload: string): string {
  return payload.replace(/%2B/g, "+");
}

// Recorre el payload empaquetado con packCV y lo desempaqueta como lo haría
// el navegador al abrir /editor?cv=<payload>.
function roundTrip(data: ResumeData): ResumeData {
  const devuelto = unpackCV(simulaParametro(packCV(data)));
  assert.ok(devuelto, "packCV -> unpackCV debe devolver un CV");
  return devuelto;
}

function base(): ResumeData {
  return structuredClone(DEFAULT_RESUME);
}

test("round-trip completo de DEFAULT_RESUME conserva todo el contenido", () => {
  const data = base();
  const back = roundTrip(data);

  const d = data.personal;
  const b = back.personal;
  for (const campo of ["name", "title", "email", "phone", "location", "website", "linkedin", "github"] as const) {
    assert.equal(b[campo], d[campo], `personal.${campo} debe conservarse`);
  }

  assert.equal(back.summary, data.summary);

  const secciones = [
    "experience", "education", "skills", "languages", "projects",
    "certifications", "awards", "licenses", "references", "affiliations",
    "customSections",
  ] as const;
  for (const s of secciones) {
    assert.equal(back[s].length, data[s].length, `${s} con el mismo nº de items`);
  }
  // Contenido de un par de items
  assert.equal(back.experience[0].company, data.experience[0].company);
  assert.equal(back.experience[0].description, data.experience[0].description);
  assert.deepEqual(back.skills[0].items, data.skills[0].items);
  assert.equal(back.certifications[0].issuer, data.certifications[0].issuer);
});

test("los ids se regeneran y son únicos al importar", () => {
  const idOriginal = base().experience[0].id;
  const back = roundTrip(base());
  assert.notEqual(back.experience[0].id, idOriginal, "el id no se comparte");
  const todas = [
    ...back.experience, ...back.education, ...back.skills, ...back.languages,
    ...back.projects, ...back.certifications, ...back.awards, ...back.licenses,
    ...back.references, ...back.affiliations, ...back.customSections,
  ].map((x) => x.id);
  assert.equal(new Set(todas).size, todas.length, "no debe haber ids duplicados");
});

test("ajustes no por defecto (plantilla, color, orden y visibilidad) se conservan", () => {
  const data = base();
  data.settings.template = "editorial";
  data.settings.accentColor = "#123456";
  data.settings.spacing = "compact";
  data.settings.sections.awards = false;
  data.settings.sections.skills = false;
  data.settings.sectionOrder = [
    "skills", "experience", "summary", "education", "languages", "projects",
    "certifications", "awards", "licenses", "references", "affiliations",
  ] as ResumeData["settings"]["sectionOrder"];

  const back = roundTrip(data);
  assert.equal(back.settings.template, "editorial");
  assert.equal(back.settings.accentColor, "#123456");
  assert.equal(back.settings.spacing, "compact");
  assert.equal(back.settings.sections.awards, false);
  assert.equal(back.settings.sections.skills, false);
  assert.equal(back.settings.sections.summary, true);
  assert.deepEqual(back.settings.sectionOrder, data.settings.sectionOrder);
});

test("campos opcionales: portfolio y licenseNumber solo si existen", () => {
  const conDato = base();
  conDato.personal.portfolio = "mariagarcia.design";
  conDato.licenses = [{
    id: "1", name: "Licencia de conducir", issuer: "DGT", date: "2020", licenseNumber: "B1234",
  }];
  const back = roundTrip(conDato);
  assert.equal(back.personal.portfolio, "mariagarcia.design");
  assert.equal(back.licenses[0]?.licenseNumber, "B1234");

  const sinDato = roundTrip(base());
  assert.equal("portfolio" in sinDato.personal, false, "portfolio vacío se omite");
  assert.equal(sinDato.licenses.length, 0);
});

test("los enlaces antiguos (JSON completo comprimido con lz-string) se siguen leyendo", () => {
  const data = base();
  const encoded = compressToEncodedURIComponent(JSON.stringify(data)).replace(/\+/g, "%2B");
  const back = unpackCV(simulaParametro(encoded));
  assert.ok(back);
  assert.equal(back.personal.name, data.personal.name);
  assert.equal(back.experience[0].id, data.experience[0].id, "el enlace antiguo conserva los ids");
  assert.equal(back.settings.template, data.settings.template);
});

test("los JSON antiguos sin comprimir también se leen", () => {
  const data = base();
  const plain = encodeURIComponent(JSON.stringify(data));
  const back = unpackCV(plain);
  assert.ok(back);
  assert.equal(back.personal.name, data.personal.name);
});

test("el payload puede llegar con el %2B intacto", () => {
  const data = base();
  const back = unpackCV(packCV(data)); // sin simular URLSearchParams
  assert.ok(back);
  assert.equal(back.personal.name, data.personal.name);
});

test("payload vacío, basura o JSON inválido devuelven null", () => {
  assert.equal(unpackCV(""), null);
  assert.equal(unpackCV("esto-no-es-un-cv"), null);
  assert.equal(unpackCV("garbage-%%%"), null);
  assert.equal(unpackCV(compressToEncodedURIComponent('{"hola": 1}')), null, "JSON válido pero sin forma de CV");
});

test("el payload compacto es sensiblemente más corto que el legacy", () => {
  const data = base();
  const legacy = compressToEncodedURIComponent(JSON.stringify(data)).replace(/\+/g, "%2B");
  const compact = packCV(data);
  assert.ok(compact.length < legacy.length * 0.75, `compacto ${compact.length} debería ser < 75% del legacy ${legacy.length}`);
});