# CVMakerApp — SPEC.md

## Concepto & visión

Generador de CVs profesional 100 % cliente (Next.js 14 App Router, TypeScript strict, Tailwind). Escribes en el panel izquierdo y ves tu CV renderizado en tiempo real a la derecha. Sin registro, sin backend, sin tracking: los datos no salen nunca del navegador.

**Persistencia:** por diseño la app **no persiste** los datos; al recargar se reinicia al estado por defecto. Para conservar un CV se usa el botón **Compartir**, que compacta el JSON (claves de una letra, campos vacíos fuera; ver `lib/share.ts`) y lo comprime con `lz-string` en un `?cv=` de la URL. Todo ocurre en el navegador. Esto es intencional, no un bug.

Inspirado en Reactive Resume (live preview, múltiples plantillas, export a PDF), con estética editorial minimalista.

---

## Diseño

**Premium mobile-first** — superficie blanca con halos muy suaves azul, cyan, violeta y rosa; tipografía grande y limpia; tarjetas flotantes con radios generosos, sombras suaves y profundidad. La estética mezcla la precisión editorial con la fluidez de Linear/Apple, sin sacrificar la lectura ni la exportación A4.

### Paleta
```
--bg:         #FFFFFF    (fondo principal)
--bg-soft:    #F7F7FB    (superficies de editor)
--surface:    #FFFFFF    (tarjetas y paneles translúcidos)
--border:     rgba(25,25,55,.09)
--text:       #171724    ( casi negro)
--text-2:     #656579    (gris medio)
--accent-blue:#287DE4
--accent-cyan:#55D8FF    (halo/decoración)
--accent:     #6659D8    (violeta principal)
--accent-pink:#D166B4    (gradientes/decoración)
```

### Tipografía
- **Landing/UI**: `Instrument Sans` (sans limpia, jerarquía amplia y tracking cerrado)
- **CVs**: la plantilla seleccionada conserva sus familias y los pares tipográficos del modelo
- **Mono**: `JetBrains Mono` (código, fechas)
- Fallbacks: system-ui, Georgia, monospace
- El editor ofrece **4 pares tipográficos** (`FONT_PAIRINGS`): default, serif, mono y display.

### Espaciado
- Base unit: 4px
- El editor permite elegir entre `compact` / `normal` / `relaxed` (`SPACING_MAP`).

### Motion
- Transiciones de opacity, transform, scale y translate con curvas suaves (~150–300ms).
- Movimiento flotante ambiental en la landing; se desactiva con `prefers-reduced-motion`.
- El preview del CV sigue siendo instantáneo al teclear para no añadir fricción.

---

## Layout & estructura

### Landing (`/`)
1. **Hero mobile-first centrado** — eyebrow, titular con profesiones, CTA, señales de privacidad y mockup visual del editor con un CV real de ejemplo
2. **Cómo funciona** — 3 tarjetas (elige diseño, escribe información, descarga/comparte)
3. **Comparativa** — tarjeta responsive con CVMakerApp frente a otras herramientas
4. **FAQ** — preguntas frecuentes (`<details>`)
5. **CTA final + Footer** — con enlaces a Política de Privacidad y de Cookies

### Editor (`/editor`)
**Split layout:**
- **Panel izquierdo (400px, colapsable)**: formulario con todas las secciones, navegación sticky por secciones con contadores, y barra de validación (errores/advertencias).
- **Panel derecho**: preview en vivo como hoja A4 con toolbar (zoom, vista **Escritorio/Móvil/ATS**, **Compartir** y menú **Exportar ▾** con **PDF** e **Imprimir**). El zoom se restablece clicando en el porcentaje.

**Secciones del formulario:**
1. Datos personales (nombre, título, email, teléfono, ubicación, web, LinkedIn, GitHub)
2. Resumen profesional (textarea)
3. Experiencia laboral
4. Educación
5. Habilidades (tags por categoría)
6. Idiomas (idioma + nivel)
7. Proyectos (nombre, descripción, URL)
8. Certificaciones
9. Premios
10. Licencias
11. Referencias
12. Afiliaciones
13. Secciones personalizadas (título + contenido libre)
14. **Diseño** — selector de **plantilla** (20, con preview real en miniatura). El modelo `ResumeSettings` admite además `accentColor`, `fontPairing`, `spacing` y `headerLayout`, y la visibilidad/orden de secciones se preserva al importar un CV por URL; hoy no hay UI para editarlos en el editor.

**Panel derecho:**
- Hoja A4 con la plantilla seleccionada
- Vistas: Escritorio, Móvil, ATS (texto plano, sin estilos)
- Zoom con botones Restablecer/Ajustar
- Estimación de número de páginas

---

## Features & interacciones

### Core
1. **Live preview** — cada keystroke actualiza el preview al instante
2. **20 plantillas** — `minimal, editorial, modern, classic, prussian, cascade, artisan, glacier, ember, obsidian, ivory, cedar, slate, sand, plum, meridian, carbon, aurora, versa, opus`
3. **Plantillas** — 20 diseños con accent propio; el modelo permite accent color, pares tipográficos y espaciados (definidos en `FONT_PAIRINGS`/`SPACING_MAP`), sin UI expuesta por ahora
4. **Export PDF** — `html2canvas` + `jsPDF` empaquetados en el bundle (sin CDN, import dinámico), paginación real en multipágina
5. **Vista ATS** — texto plano legible por sistemas de seguimiento de candidatos; desde ATS también se puede exportar PDF
6. **Compartir por URL** — `?cv=<JSON compactado y comprimido con lz-string>` (100 % cliente, en `lib/share.ts`); los enlaces antiguos con JSON completo se siguen leyendo
7. **Multi-CV** — crear, duplicar, renombrar, eliminar y seleccionar CVs (en memoria)
8. **Validación** — errores y advertencias por campo; al importar un CV por URL se mergea la visibilidad/orden de secciones
9. **Visibilidad/orden de secciones** — viven en el modelo (`settings.sections.X` gatea cada sección en las plantillas; `sectionOrder` se usa en la vista ATS) y se mergean al importar un CV por URL; sin UI propia en el editor

### Interacciones
- **Añadir item** (experiencia, educación, etc.): botón "+" que añade un item vacío
- **Eliminar item**: botón "✕" (sin confirmación inline, borrado directo)
- **Selector de plantilla**: tarjetas visuales, activa marcada con borde accent
- **Export PDF**: click → loading → descarga automática; en escritorio también se puede imprimir
- **Empty states**: campos opcionales vacíos no se renderizan en el CV

### Edge cases
- CV muy largo → scroll en preview + paginación real en el PDF
- Sin datos → `DEFAULT_RESUME` con datos de ejemplo (María García López)
- Visibilidad de secciones al compartir/importar CV: se mergea con el estado actual

---

## Modelo de datos (`lib/types.ts`)

```typescript
interface ResumeData {
  personal: PersonalInfo;            // name, title, email, phone, location, website, linkedin, github, portfolio
  summary: string;
  experience: ExperienceItem[];      // company, position, startDate, endDate, description
  education: EducationItem[];        // institution, degree, startDate, endDate
  skills: SkillCategory[];           // category, items[]
  languages: LanguageItem[];         // language, level
  projects: ProjectItem[];           // name, description, url
  certifications: CertificationItem[]; // name, issuer, date
  awards: AwardItem[];               // name, issuer, date
  licenses: LicenseItem[];           // name, issuer, date, licenseNumber?
  references: ReferenceItem[];       // name, company, phone, email, relationship
  affiliations: AffiliationItem[];   // organization, role, startDate, endDate
  customSections: CustomSection[];   // title, content, order
  settings: ResumeSettings;          // template, accentColor, fontPairing,
                                     // spacing, headerLayout, sections (visibilidad),
                                     // sectionOrder
}
```

---

## Arquitectura

- `app/page.tsx` — Wrapper server de la landing: metadata SEO (título, descripción, canonical, Open Graph/Twitter) y JSON-LD `@graph` (`WebSite` + `SoftwareApplication` + `FAQPage`)
- `app/home-client.tsx` — Landing (client, estilos inline). H1 con texto SEO real desde el HTML (`sr-only`) + typewriter decorativo (`aria-hidden`)
- `app/editor/page.tsx` — Wrapper con metadata **estática** (build 100 % estático): la pestaña del navegador se personaliza en cliente al importar `?cv=`; si se vuelve a un deploy con servidor, restaurar `generateMetadata(searchParams)`. `/editor` es `noindex, follow` y tiene canonical
- `app/editor/editor-client.tsx` — Todo el editor en un único archivo client (formulario, preview, toolbar, modales de share y ATS)
- `app/globals.css` — Estilos globales: botones neobrutalistas, editor, media queries responsive (<860px)
- `app/robots.ts` — `robots.txt` generado en el build (permite rastreo; el `noindex` vive en cada página)
- `app/sitemap.ts` — `sitemap.xml` con solo la landing (única página indexable; `/editor` y las legales son noindex)
- `components/templates/` — 20 componentes de plantilla + `helpers.tsx` (fuentes, orden de secciones, secciones personalizadas)
- `components/ui/` — FormField, SectionAccordion
- `lib/store.tsx` — Contexto React (`ResumeProvider`/`useResume`) + gestión multi-CV. `loadCVs()` borra las claves de localStorage en cada mount y devuelve `[]`; `saveCVs()` es no-op (sin persistencia, por diseño)
- `lib/types.ts` — Tipos, `DEFAULT_RESUME`, `TEMPLATES`, `FONT_PAIRINGS`, `SPACING_MAP`
- `lib/share.ts` — Empaquetado compacto de `?cv=` (`packCV`/`unpackCV`, compat legacy); tests en `lib/share.test.ts` (`npm test`)
- `lib/faq.ts` — FAQ de la landing, fuente única compartida por `app/home-client.tsx` (render) y el JSON-LD `FAQPage` de `app/page.tsx`
- `remotion/src/` — composición promocional autocontenida para Instagram (1080×1920, 15 s, 30 fps). Es una fuente de vídeo offline: no entra en el bundle de Next.js ni cambia el runtime estático

**Añadir una plantilla** toca 3 sitios: `TEMPLATES` en `lib/types.ts`, la componente en `components/templates/`, y el mapa `TEMPLATE_COMPONENTS` (con `TemplateRenderer`) en `editor-client.tsx`.

---

## Export a PDF

1. El preview del CV tiene un `ref`
2. Al exportar: `html2canvas(ref.current, { scale: 2 })` → canvas → `canvas.toDataURL('image/png')` → `jsPDF` → descarga
3. `html2canvas` + `jsPDF` están en `package.json` (deps npm) y se importan dinámicamente en `handleExportPDF` — sin CDN, sin servidor externo
4. Soporta multipágina con paginación real

---

## Deploy

- **Build:** `next build` genera `out/` **100 % estático** (`output: "export"` en `next.config.mjs`, imágenes sin optimizar) → alojable en cualquier hosting estático.
- **Producción:** Vercel → `https://cvmakerapp.vercel.app` (sirve el export estático).
- Sin variables de entorno; cero servidor Node en runtime: todo ocurre en el navegador.

---

## Criterios de éxito

- [ ] `npm run typecheck` pasa sin errores (`tsc --noEmit`)
- [ ] `npm run test` pasa (tests de `lib/share.ts`)
- [ ] `npm run build` termina con EXIT 0 y genera el export estático en `out/`
- [ ] Las 20 plantillas renderizan correctamente
- [ ] Live preview actualiza por keystroke sin fricción
- [ ] Export PDF genera archivo legible, bien formateado y multipágina
- [ ] Vista ATS muestra el contenido en texto plano
- [ ] Compartir por URL → el receptor ve el mismo CV
- [ ] UI íntegra en español