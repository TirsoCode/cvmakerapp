import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cvmakerapp.vercel.app";
  const now = new Date();

  // Solo la landing, que es la única página indexable (todas con canonical).
  // /editor, /politica-privacidad y /politica-cookies son noindex y no
  // deben aparecer aquí.
  return [
    {
      url: base + "/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}