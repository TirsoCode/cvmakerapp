# CVMakerApp

Generador de currículums profesionales con 20 plantillas premium. Crea, personaliza y descarga tu CV en minutos. 100 % en el navegador: sin registro, sin backend, sin tracking.

🔗 **Producción:** <https://cvmakerapp.vercel.app>

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Scripts

| Comando        | Descripción                       |
| -------------- | --------------------------------- |
| `npm run dev`  | Servidor de desarrollo            |
| `npm run build`| Build de producción estático (genera `out/`) |
| `npm run start`| No aplica con `output: "export"`: sirve `out/` con cualquier servidor estático (`npx serve out`) |
| `npm run typecheck` | `tsc --noEmit` (verificación rápida) |
| `npm run test` | Tests de `lib/share.ts` (node test runner + tsx) |
| `npm run lint` | ESLint (`next lint`, con `eslint-config-next`) |

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict, build **100 % estático** (`output: "export"`): HTML/CSS/JS puros en `out/`, alojable en cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.), sin servidor
- **React 18** + **Tailwind CSS**
- **Export a PDF**: `html2canvas` + `jsPDF` empaquetados en el bundle (sin CDN, import dinámico)
- **Compartir por URL**: el CV se compacta (claves cortas, sin campos vacíos) y se comprime con `lz-string` en un `?cv=` en la URL. Todo en el navegador, sin servicios externos

## Features

- 20 plantillas premium (selector de Diseño con preview real de cada una)
- Editor en vivo: escribes a la izquierda y ves tu CV en A4 renderizado en tiempo real a la derecha
- 11 secciones editables (resumen, experiencia, educación, habilidades, idiomas, proyectos, certificaciones, premios, licencias, referencias, afiliaciones) + secciones personalizadas
- Vistas **Escritorio / Móvil / ATS** y zoom en el preview
- Exporta a **PDF** e **Imprimir**
- Comparte tu CV por **URL** (sin pasar por ningún servidor)
- Varios CVs en paralelo: crear, duplicar, renombrar y eliminar
- Validación de datos con errores y advertencias + estimación de páginas
- Sin registro, sin límite, sin cookies

> **Nota de persistencia:** por diseño, la app **no guarda** los datos (al recargar se reinicia). Si quieres conservar un CV, compártelo por URL.

## Deploy

Build **estático** (`next build` genera `out/`): súbelo a cualquier hosting estático. En **Vercel** basta conectar el repo (detecta automáticamente el export).

```bash
git push origin main
```

## Estructura

```
app/
  page.tsx                 Landing (client, estilos inline)
  editor/
    page.tsx               Wrapper server: metadata + descompresión de ?cv= para SEO
    editor-client.tsx      Todo el editor en un único archivo client
  layout.tsx               Root layout + metadata
  globals.css              Estilos globales (neobrutalismo, editor, responsive)
components/
  templates/               Una componente por plantilla (20) + helpers compartidos
  ui/                      FormField, SectionAccordion
lib/
  types.ts                 Modelo ResumeData, TEMPLATES, FONT_PAIRINGS, SPACING_MAP
  store.tsx                Contexto React (ResumeProvider / useResume) + gestión multi-CV
  share.ts                 Empaquetado compacto de ?cv= (packCV/unpackCV) + tests (share.test.ts)
```

