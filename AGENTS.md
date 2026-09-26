# CVMakerApp — AGENTS.md

Generador de CV 100 % cliente (Next.js 14 App Router, TypeScript strict, Tailwind). Toda la UI está en español: mantiene ese idioma en textos nuevos.

## Comandos

- `npm run dev` — dev server en localhost:3000
- `npm run typecheck` — `tsc --noEmit` (verificación rápida principal)
- `npm run build` — build de producción (debe acabar con EXIT 0; genera `out/` estático)
- `npm run test` — tests de `lib/share.ts` (node test runner + tsx); verificación = typecheck + build + test
- `npm run lint` — `next lint` (ESLint con `eslint-config-next`, config en `.eslintrc.json`)

## Arquitectura

- `app/page.tsx` — landing. Es un wrapper **server**: exporta metadata SEO (título, descripción, canonical, Open Graph/Twitter) y JSON-LD `WebSite`. El componente client real vive en `app/home-client.tsx` (estilos inline): su H1 incluye texto SEO real desde el HTML (`sr-only`) y el typewriter es decorativo (`aria-hidden`).
- `app/editor/editor-client.tsx` (~1090 líneas) — TODO el editor en un único archivo client: formulario izquierdo, preview derecho, toolbar (zoom, Escritorio/Móvil/ATS, Compartir, Imprimir, MD, PDF), modal share y ATS.
- `app/editor/page.tsx` — wrapper: metadata **estática** (build estático, sin servidor por petición) + render del editor client. `/editor` es `noindex, follow` con canonical propio.
- `lib/types.ts` — modelo `ResumeData`, `DEFAULT_RESUME`, `TEMPLATES` (20 plantillas), `FONT_PAIRINGS`, `SPACING_MAP`.
- `lib/store.tsx` — contexto React (`ResumeProvider` / `useResume`) + gestión multi-CV.
- `components/templates/` — una componente por plantilla; `components/ui/` — FormField, SectionAccordion.

## Gotchas

- **Sin persistencia intencionada**: `loadCVs()` en `lib/store.tsx` borra las claves de localStorage en cada mount y devuelve `[]`; `saveCVs()` es un no-op. Al recargar se resetea. SPEC.md y README ya lo documentan. No lo "arregles" sin que te lo pidan explícitamente.
- **SPEC.md refleja la realidad actual** (20 plantillas, sin persistencia, sin UI de visibilidad/reorden de secciones, sin dark mode). Si cambias el comportamiento de la app, actualízalo.
- **Añadir una plantilla** toca 3 sitios: `TEMPLATES` en `lib/types.ts`, la componente en `components/templates/`, y el mapa `TEMPLATE_COMPONENTS` + `TemplateRenderer` en `editor-client.tsx`. Las miniaturas del selector de Diseño (`TemplateMini`) usan ese mismo mapa y no necesitan cambios extra.
- **PDF export** usa `html2canvas` + `jsPDF` como dependencias npm (bundled, sin CDN), importadas dinámicamente en `handleExportPDF`.
- **Compartir CV** = URL `?cv=<JSON compactado y comprimido con lz-string>`; todo en el navegador (`lib/share.ts`, tests en `lib/share.test.ts`). Los enlaces antiguos (JSON completo) se siguen decodificando.
- **Añadir un campo al modelo** toca `lib/types.ts` y el pack/unpack de `lib/share.ts` (`toCompact`/`fromCompact`), y conviene actualizar `lib/share.test.ts`.
- **Build estático**: `next.config.mjs` tiene `output: "export"` + `images.unoptimized`. Consecuencia: la metadata de `/editor` es fija (nada de `searchParams` en `generateMetadata`); el título de la pestaña se personaliza en cliente al importar `?cv=`. Si se vuelve a un deploy con servidor, restaurar `generateMetadata(searchParams)`.
- **SEO**: la única página indexable es la landing. `/editor`, `/acerca-de`, `/politica-privacidad` y `/politica-cookies` son `noindex` vía metadata de cada página (no en `robots.txt`, para que los crawlers sigan sus enlaces); `app/robots.ts` y `app/sitemap.ts` (solo la landing) se generan en el build. Cada página lleva su `alternates.canonical`. Al añadir una ruta no indexable, repite el patrón: `robots: { index: false, follow: false }` + canonical, y no la metas en el sitemap. El JSON-LD de la home (`WebSite` + `SoftwareApplication` + `FAQPage`) se genera en `app/page.tsx`; el FAQ sale de `lib/faq.ts` (fuente única con `app/home-client.tsx`), así que las preguntas nunca se desincronizan del JSON-LD.
- **Sin tracking, y es en serio**: NO reinstales `@vercel/analytics` ni ningún otro tracker (Vercel Analytics, Speed Insights, GA, Plausible…). Ya se instaló una vez por un PR automático de Vercel y dejó la web diciendo cosas falsas: `politica-privacidad` afirma "no usamos cookies ni ningún mecanismo de seguimiento según el RGPD", y el hero y la sección de precios prometen "100 % privado" / "sin cookies". Vercel Analytics **sí** pone una cookie de identificación de visitante, que en la UE exige consentimiento previo. Se retiró en el commit `revert: Vercel Analytics` posterior a `66877f2`. Si algún día quieres métricas, primero actualiza la copy y añade el banner de cookies, y solo después mete el script.
- **Imagen OG**: `public/og.png` (1200×630) es la tarjeta de Open Graph/Twitter (`summary_large_image`) de layout, home y editor. Se regenera con `sh scripts/gen-og.sh` (ffmpeg + Liberation fonts); si cambias el titular o la paleta, actualiza y re-ejecuta el script.
- **Deploy**: producción en **Vercel** (`https://cvmakerapp.vercel.app`). Las URLs `*.vercel.app` en `app/layout.tsx`, `app/sitemap.ts` y `public/google1f83d5ab4be3cd04.html` son correctas; no las cambies.

## Estilo

- Estilos mayoritariamente inline; clases globales en `app/globals.css`: botones neobrutalistas (`.boton-neobrutalista`, `-sm`, `-primario`), editor (`.editor-nav*`, `.editor-aside*`, `.a4-paper`) y media queries responsive del editor (<860px).
- Paleta editorial: fondo `#FAFAF8`, superficies `#F3F2EE`, bordes `#E4E2DC`, texto `#1A1918`, accent `#C0392B`.

