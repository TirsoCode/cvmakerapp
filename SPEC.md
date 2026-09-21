# CVMakerApp — SPEC.md

## Concepto & visión

Generador de CVs profesional 100 % cliente (Next.js 14 App Router, TypeScript strict, Tailwind). Escribes en el panel izquierdo y ves tu CV renderizado en tiempo real a la derecha. Sin registro, sin backend, sin tracking: los datos no salen nunca del navegador.

**Persistencia:** por diseño la app **no persiste** los datos; al recargar se reinicia al estado por defecto. Para conservar un CV se usa el botón **Compartir**, que empaqueta el JSON (`lz-string`) en un `?cv=` de la URL. Esto es intencional, no un bug.

Inspirado en Reactive Resume (live preview, múltiples plantillas, export a PDF), con estética editorial minimalista.

---

## Diseño

**Premium Editorial Minimalism** — bastantes blancos, tipografía jerárquica fuerte, accent color contenido (estilo revista, no SaaS genérico).

### Paleta
```
--bg:         #FAFAF8    (off-white cálido)
--bg-2:       #F3F2EE    (superficie secundaria)
--surface:    #FFFFFF    (cartas, paneles)
--border:     #E4E2DC    (bordes sutiles)
--border-2:   #CBC8C0    (bordes más fuertes)
--text:       #1A1918    (negro suave)
--text-2:     #6B6860    (gris medio)
--text-3:     #9C9890    (gris claro)
--accent:     #C0392B    (rojo editorial)
--accent-2:   #2563EB    (azul link)
```

### Tipografía
- **Headings**: `Playfair Display` (serif editorial)
- **Body/UI**: `Instrument Sans` (sans geométrica)
- **Mono**: `JetBrains Mono` (código, fechas)
- Fallbacks: Georgia, system-ui, monospace
- Además, el editor ofrece **4 pares tipográficos** (`FONT_PAIRINGS`): default, serif, mono y display.

### Espaciado
- Base unit: 4px
- El editor permite elegir entre `compact` / `normal` / `relaxed` (`SPACING_MAP`).

### Motion
- Fade-in sutil en secciones (~200ms), hover ~150ms, preview instantáneo (sin animación al teclear).

---

## Layout & estructura

### Landing (`/`)
1. **Hero** — titular, subtítulo, CTA "Crear mi CV" → `/editor`
2. **Showcase de plantillas** — miniaturas (preview de 4 plantillas concretas)
3. **Features** — sin registro, export PDF, tus datos son tuyos
4. **Footer** — minimal

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
14. **Diseño** — plantilla (20), color de acento, par tipográfico, espaciado, cabecera (centrada/izquierda/sidebar), visibilidad y orden de secciones

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
3. **Personalización** — accent color, 4 pares tipográficos, 3 espaciados, layout de cabecera
4. **Export PDF** — `html2canvas` + `jsPDF` (CDN en runtime), paginación real en multipágina
5. **Vista ATS** — texto plano legible por sistemas de seguimiento de candidatos; desde ATS también se puede exportar PDF
6. **Compartir por URL** — `?cv=<JSON comprimido con lz-string>`, descomprimido en server y client
7. **Multi-CV** — crear, duplicar, renombrar, eliminar y seleccionar CVs (en memoria)
8. **Validación** — errores y advertencias por campo; al importar un CV por URL se mergea la visibilidad/orden de secciones
9. **Gestión de secciones** — visibilidad (mostrar/ocultar) y reorden (botones Subir/Bajar)

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
  personal: PersonalInfo;            // name, title, email, phone, location, website, linkedin, github
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

- `app/page.tsx` — Landing (client, estilos inline)
- `app/editor/page.tsx` — Wrapper server: metadata dinámica + descompresión de `?cv=` para SEO
- `app/editor/editor-client.tsx` — Todo el editor en un único archivo client (formulario, preview, toolbar, modales de share y ATS)
- `app/globals.css` — Estilos globales: botones neobrutalistas, editor, media queries responsive (<860px)
- `components/templates/` — 20 componentes de plantilla + `helpers.tsx` (fuentes, orden de secciones, secciones personalizadas)
- `components/ui/` — FormField, SectionAccordion, TemplateSelector, ExportButton
- `lib/store.tsx` — Contexto React (`ResumeProvider`/`useResume`) + gestión multi-CV. `loadCVs()` borra las claves de localStorage en cada mount y devuelve `[]`; `saveCVs()` es no-op (sin persistencia, por diseño)
- `lib/types.ts` — Tipos, `DEFAULT_RESUME`, `TEMPLATES`, `FONT_PAIRINGS`, `SPACING_MAP`

**Añadir una plantilla** toca 3 sitios: `TEMPLATES` en `lib/types.ts`, la componente en `components/templates/`, y el switch `TemplateRenderer` en `editor-client.tsx`.

---

## Export a PDF

1. El preview del CV tiene un `ref`
2. Al exportar: `html2canvas(ref.current, { scale: 2 })` → canvas → `canvas.toDataURL('image/png')` → `jsPDF` → descarga
3. `html2canvas` + `jsPDF` se cargan desde CDN en runtime (no en `package.json`)
4. Soporta multipágina con paginación real

---

## Deploy

- **Producción:** Vercel → `https://cvmakerapp.vercel.app` (connector de Next.js)
- No se requieren variables de entorno: app 100 % estática en runtime

---

## Criterios de éxito

- [ ] `npm run typecheck` pasa sin errores (`tsc --noEmit`)
- [ ] `npm run build` termina con EXIT 0
- [ ] Las 20 plantillas renderizan correctamente
- [ ] Live preview actualiza por keystroke sin fricción
- [ ] Export PDF genera archivo legible, bien formateado y multipágina
- [ ] Vista ATS muestra el contenido en texto plano
- [ ] Compartir por URL → el receptor ve el mismo CV
- [ ] UI íntegra en español