import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cvmakerapp.vercel.app";
  const now = new Date();

  return [
    {
      url: base + "/",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: base + "/editor",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: base + "/politica-privacidad",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: base + "/politica-cookies",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}