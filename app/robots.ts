import type { MetadataRoute } from "next";

// robots.txt generado en el build estático (out/robots.txt).
// Las páginas que no deben indexarse (/editor, /politica-privacidad,
// /politica-cookies) se excluyen con <meta name="robots" content="noindex">
// en cada página, no con robots.txt, para que los crawlers puedan entrar y
// seguir sus enlaces (overlay / follow).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://cvmakerapp.vercel.app/sitemap.xml",
  };
}