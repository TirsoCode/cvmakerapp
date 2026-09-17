import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CVMakerApp",
    short_name: "CVMakerApp",
    description:
      "Generador de currículums con 20 plantillas premium, exporta a PDF y Markdown. Sin registro, sin límite, en minutos.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#1A1918",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}