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
| `npm run build`| Build de producción               |
| `npm run start`| Sirve el build de producción      |
| `npm run typecheck` | `tsc --noEmit` (verificación rápida) |
| `npm run lint` | `next lint`                       |

## Stack

- **Next.js 14** (App Router) + **TypeScript** strict
- **React 18** + **Tailwind CSS**
- **Export a PDF**: `html2canvas` + `jsPDF` cargados por CDN en runtime (no están en `package.json`)
- **Compartir por URL**: el CV se comprime con `lz-string` en un `?cv=` en la URL

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

Producción en **Vercel**: haz push a GitHub y conecta el repo en Vercel (detecta Next.js automáticamente).

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
scripts/                   Utilidades de generación de contenido (vídeo, thumbnails)
```

## Repositorio

<https://github.com/TirsoCode/cvmakerapp>