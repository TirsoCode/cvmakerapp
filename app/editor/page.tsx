import type { Metadata } from "next";
import EditorClient from "./editor-client";

// Con output: "export" la metadata se calcula en build (no hay servidor por
// petición), así que no se lee ?cv= aquí. La pestaña del navegador se
// personaliza en el cliente (editor-client.tsx) al importar un CV compartido;
// los crawlers ven la vista genérica. Si algún día se vuelve a un deploy con
// servidor, reutilizar unpackCV(searchParams.cv) en generateMetadata.
export const metadata: Metadata = {
  title: "Editor de CV en línea",
  description:
    "Crea y personaliza tu currículum gratis: 20 plantillas, exporta a PDF y compártelo con un enlace. Sin registro.",
  // El editor es la app en sí: útil para los usuarios pero no añade valor
  // de indexación (el contenido depende de ?cv= y es 100 % cliente).
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://cvmakerapp.vercel.app/editor",
  },
  openGraph: {
    title: "CVMakerApp — Edita tu currículum",
    description:
      "Crea y personaliza tu currículum gratis: 20 plantillas, exporta a PDF y compártelo con un enlace. Sin registro.",
    type: "website",
    locale: "es_ES",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CVMakerApp — Crea tu currículum gratis en minutos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVMakerApp — Edita tu currículum",
    description:
      "Crea y personaliza tu currículum gratis: 20 plantillas, exporta a PDF y compártelo con un enlace.",
    images: ["/og.png"],
  },
};

export default function EditorPage() {
  return <EditorClient />;
}