# Resume Builder — SPEC.md

## Concept & Vision

Un generador de CVs profesional con estética editorial premium. La experiencia es: escribes en el panel izquierdo y ves tu CV renderizado en tiempo real en el derecho. Sin registro, sin backend, sin tracking. Tus datos viven en localStorage. El diseño transmite seriedad profesional sin ser aburrido — inspirado en revistas de tipografía más que en software SaaS genérico.

Inspirado en Reactive Resume (live preview, múltiples plantillas, exportación PDF) pero construido como app 100% cliente con 4 plantillas exclusivas y estética editorial minimalista.

---

## Design Language

### Aesthetic Direction
**Premium Editorial Minimalism** — Inspirado en revistas de diseño suizas y日本的 editorials. Blanco dominante, tipografía jerárquica fuerte, detalles de color como accent sparse.

### Color Palette
```
--bg:         #FAFAF8    (off-white cálido)
--bg-2:       #F3F2EE    (superficie secundaria)
--surface:    #FFFFFF    (cartas, paneles)
--border:     #E4E2DC    (bordes sutiles)
--border-2:   #CBC8C0    (bordes más fuertes)
--text:       #1A1918    (negro suave)
--text-2:     #6B6860    (gris medio)
--text-3:     #9C9890    (gris claro)
--accent:     #C0392B    (rojo editorial — como el NYT)
--accent-2:   #2563EB    (azul Link)
```

### Typography
- **Headings**: `Playfair Display` (serif editorial, tracking tight)
- **Body/UI**: `Instrument Sans` (geometric sans, clean)
- **Mono**: `JetBrains Mono` (código, fechas)
- Fallbacks: Georgia, system-ui, monospace

### Spacing
- Base unit: 4px
- Section padding: 24px / 32px
- Card padding: 20px / 24px
- Gap between fields: 12px

### Motion
- Subtle fade-in on section load: 200ms ease-out
- Hover states: 150ms transitions
- Preview updates: instant (no animation on text typing)
- Page transitions: none (keeps it snappy)

### Visual Assets
- Icons: Phosphor Icons (thin weight) via CDN
- No stock photos
- Decorative: thin 1px borders, subtle background textures on some templates

---

## Layout & Structure

### Landing Page (`/`)
1. **Hero** — Headline grande, subtítulo, CTA "Crear mi CV" → `/editor`
2. **Template showcase** — 4 cards con preview en miniatura de cada plantilla
3. **Features** — 3 columnas: "Sin registro", "Exporta a PDF", "Tus datos son tuyos"
4. **Footer** — Minimal, copyright

### Editor Page (`/editor`)
**Split layout**:
- **Left panel (40%)**: Formulario scrollable con todas las secciones del CV
- **Right panel (60%)**: Preview en vivo del CV renderizado como una hoja A4

**Left panel sections**:
1. Datos personales (nombre, título, email, teléfono, ubicación, LinkedIn, GitHub, website)
2. Resumen profesional (textarea)
3. Experiencia laboral (lista de trabajos: empresa, puesto, fechas, descripción)
4. Educación (lista: institución, título, fechas)
5. Habilidades (tags separadors por categoría)
6. Idiomas (lista con nivel)
7. Proyectos (nombre, descripción, enlace)
8. Configuración de plantilla (selector visual de 4 plantillas + colores)

**Right panel**:
- Hoja A4 rendered con la plantilla seleccionada
- Escala al viewport con scroll
- Badge de la plantilla actual

---

## Features & Interactions

### Core Features
1. **Live preview** — Cada keystroke actualiza el preview derecho instantáneamente
2. **4 plantillas** — Minimal, Editorial, Modern, Classic
3. **PDF export** — Botón que genera y descarga PDF usando html2canvas + jsPDF
4. **localStorage persistence** — Los datos se guardan automáticamente en cada cambio
5. **Template switching** — Cambiar plantilla preserva todos los datos
6. **Section management** — Cada sección es collapsible en el editor
7. **Dark mode toggle** — El editor soporta modo oscuro

### Interactions
- **Add item** (experiencia, educación, etc.): botón "+" que añade un item vacío con animación fade-in
- **Delete item**: botón "✕" con confirmación inline
- **Reorder sections**: drag handles para reordenar secciones del CV
- **Template selector**: 4 cards visuales clickeables, plantilla activa tiene borde accent
- **Export PDF**: click en botón → loading state → descarga automática
- **Empty states**: cada sección vacía muestra placeholder con hint de qué escribir

### Edge Cases
- Si localStorage está lleno: warning toast, permite descargar JSON
- Campos opcionales vacíos: no se renderizan en el CV
- CV muy largo: el preview permite scroll interno
- Sin datos: preview muestra placeholder con nombre "Tu Nombre" y datos example

---

## Component Inventory

### ResumeTemplate (x4)
- **Minimal**: Blanco puro, sans-serif, líneas finas separadoras, nombre en negrita grande
- **Editorial**: Dos columnas, serif para headings, accent color en fechas
- **Modern**: Header con fondo gris, negrita en nombres de empresa, monospace para fechas
- **Classic**: Template tradicional, serif para todo, líneas separatoras horizontales

Cada template recibe un objeto `ResumeData` y renderiza JSX.

### SectionAccordion
- Header con título + icono de chevron + item count
- Contenido collapsible con animación height transition
- Estados: expanded (default para secciones con datos), collapsed (secciones vacías)

### TemplateSelector
- 4 cards en grid 2x2
- Cada card: mini preview SVG del template + nombre
- Active: border accent 2px, shadow sutil

### ExportButton
- Estados: default ("Exportar PDF"), loading (spinner), success (checkmark momentáneo)
- Icono de download a la izquierda

### FormField
- Label arriba, input abajo
- Placeholder con hint
- Focus: border accent, ring sutil

---

## Technical Approach

### Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (para layout y utilidades base)
- **CSS Modules** o inline styles para los templates (mejor control dePrint styles)
- **html2canvas + jsPDF** via CDN para exportación PDF
- **localStorage** para persistencia

### Data Model
```typescript
interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{ id: string; category: string; items: string[] }>;
  languages: Array<{ id: string; language: string; level: string }>;
  projects: Array<{ id: string; name: string; description: string; url?: string }>;
  settings: {
    template: "minimal" | "editorial" | "modern" | "classic";
    accentColor: string;
  };
}
```

### Architecture
- `/app/page.tsx` — Landing page
- `/app/editor/page.tsx` — Editor con split layout
- `/app/globals.css` — CSS vars + Tailwind base
- `/components/templates/` — 4 componentes de plantilla
- `/components/ui/` — Accordion, FormField, TemplateSelector, ExportButton
- `/lib/store.ts` — Context + localStorage hook
- `/lib/types.ts` — TypeScript types

### PDF Export Strategy
1. El preview del CV tiene un `ref`
2. Al exportar: `html2canvas(ref.current, { scale: 2 })` → canvas
3. `canvas.toDataURL('image/png')` → jsPDF → download
4. Timeout de 10s con error handling si falla

---

## Success Criteria

- [ ] Landing page carga en < 1s, muestra las 4 plantillas
- [ ] Editor carga con datos de localStorage o datos de ejemplo
- [ ] Live preview actualiza en < 50ms por keystroke
- [ ] Todas las 4 plantillas renderizan correctamente
- [ ] PDF export genera archivo legible y bien formateado
- [ ] Datos persisten al recargar la página
- [ ] `npx tsc --noEmit` pasa sin errores
- [ ] `next build` termina con EXIT 0
- [ ] Deploy en Vercel funciona
