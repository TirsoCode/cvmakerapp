import type { Metadata } from "next";
import { decompressFromEncodedURIComponent } from "lz-string";
import EditorClient from "./editor-client";

interface EditorPageProps {
  searchParams: { cv?: string };
}

export async function generateMetadata({ searchParams }: EditorPageProps): Promise<Metadata> {
  let name = "";
  try {
    const encoded = searchParams?.cv || "";
    const json =
      decompressFromEncodedURIComponent(encoded) ||
      decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json);
    if (parsed?.personal?.name) name = String(parsed.personal.name);
  } catch {
    // shared payload vacío o inválido
  }
  const title = name ? `${name} — CV en CVMakerApp` : "CVMakerApp — Comparte tu currículum";
  const description = name
    ? `Mira el currículum de ${name}, creado con CVMakerApp.`
    : "Crea currículums profesionales en minutos. Sin registro, sin límite. 20 plantillas premium.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: "CVMakerApp" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}

export default function EditorPage() {
  return <EditorClient />;
}