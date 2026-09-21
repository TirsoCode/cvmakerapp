# CVMakerApp — AGENTS.md

Generador de CV 100 % cliente (Next.js 14 App Router, TypeScript strict, Tailwind). Toda la UI está en español: mantiene ese idioma en textos nuevos.

## Comandos

- `npm run dev` — dev server en localhost:3000
- `npm run typecheck` — `tsc --noEmit` (verificación rápida principal)
- `npm run build` — build de producción (debe acabar con EXIT 0)
- `npm run lint` — `next lint` (sin configuración extra)
- No hay suite de tests. Verificación = typecheck + build.

## Arquitectura

- `app/page.tsx` — landing. Es un componente client pese a llamarse `page.tsx`; todo con estilos inline.
- `app/editor/editor-client.tsx` (~1090 líneas) — TODO el editor en un único archivo client: formulario izquierdo, preview derecho, toolbar (zoom, Escritorio/Móvil/ATS, Compartir, Imprimir, MD, PDF), modal share y ATS.
- `app/editor/page.tsx` — wrapper server: metadata dinámica y descompresión de `?cv=` para SEO.
- `lib/types.ts` — modelo `ResumeData`, `DEFAULT_RESUME`, `TEMPLATES` (20 plantillas), `FONT_PAIRINGS`, `SPACING_MAP`.
- `lib/store.tsx` — contexto React (`ResumeProvider` / `useResume`) + gestión multi-CV.
- `components/templates/` — una componente por plantilla; `components/ui/` — FormField, SectionAccordion, TemplateSelector, ExportButton.

## Gotchas

- **Sin persistencia intencionada**: `loadCVs()` en `lib/store.tsx` borra las claves de localStorage en cada mount y devuelve `[]`; `saveCVs()` es un no-op. Al recargar se resetea. SPEC.md y README ya lo documentan. No lo "arregles" sin que te lo pidan explícitamente.
- **SPEC.md refleja la realidad actual** (20 plantillas, sin persistencia, reorden con "Subir/Bajar", sin dark mode). Si cambias el comportamiento de la app, actualízalo.
- **Añadir una plantilla** toca 3 sitios: `TEMPLATES` en `lib/types.ts`, la componente en `components/templates/`, y el switch `TemplateRenderer` en `editor-client.tsx`. La mini-preview de la landing (`TemplateThumbnail` en `app/page.tsx`) solo maneja 4 ids concretos.
- **PDF export** carga `html2canvas` + `jsPDF` desde CDN en runtime (no están en package.json).
- **Compartir CV** = URL `?cv=<JSON comprimido con lz-string>`; se descomprime en server y en client.
- **Deploy**: producción en **Vercel** (`https://cvmakerapp.vercel.app`). `netlify.toml` (Netlify, Node 20, `@netlify/plugin-nextjs`) existe como alternativa pero no está activo. Las URLs `*.vercel.app` en `app/layout.tsx`, `app/sitemap.ts` y scripts son correctas; no las cambies.

## Estilo

- Estilos mayoritariamente inline; clases globales en `app/globals.css`: botones neobrutalistas (`.boton-neobrutalista`, `-sm`, `-primario`), editor (`.editor-nav*`, `.editor-aside*`, `.a4-paper`) y media queries responsive del editor (<860px).
- Paleta editorial: fondo `#FAFAF8`, superficies `#F3F2EE`, bordes `#E4E2DC`, texto `#1A1918`, accent `#C0392B`.

