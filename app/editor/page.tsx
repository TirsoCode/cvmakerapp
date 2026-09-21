import type { Metadata } from "next";
import EditorClient from "./editor-client";

// Con output: "export" la metadata se calcula en build (no hay servidor por
// petición), así que no se lee ?cv= aquí. La pestaña del navegador se
// personaliza en el cliente (editor-client.tsx) al importar un CV compartido;
// los crawlers ven la vista genérica. Si algún día se vuelve a un deploy con
// servidor, reutilizar unpackCV(searchParams.cv) en generateMetadata.
export const metadata: Metadata = {
  title: "Editor de CV — CVMakerApp",
  description:
    "Crea y personaliza tu currículum gratis: 20 plantillas, exporta a PDF y compártelo con un enlace. Sin registro.",
  openGraph: {
    title: "CVMakerApp — Edita tu currículum",
    description:
      "Crea y personaliza tu currículum gratis: 20 plantillas, exporta a PDF y compártelo con un enlace. Sin registro.",
    type: "website",
    locale: "es_ES",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "CVMakerApp" }],
  },
  twitter: {
    card: "summary",
    title: "CVMakerApp — Edita tu currículum",
    description:
      "Crea y personaliza tu currículum gratis: 20 plantillas, exporta a PDF y compártelo con un enlace.",
    images: ["/logo.png"],
  },
};

export default function EditorPage() {
  return <EditorClient />;
}