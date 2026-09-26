import type { Metadata } from "next";
import HomeClient from "./home-client";
import { FAQ } from "../lib/faq";

// Metadata específica de la landing. El HTML real de la página lo renderiza
// HomeClient (componente client); aquí aportamos título, descripción,
// canonical, redes sociales y datos estructurados indexables.
export const metadata: Metadata = {
  title: "Crea tu CV gratis en minutos con 20 plantillas",
  description:
    "Crea tu currículum profesional gratis en minutos. Sin registro y sin marca de agua: 20 plantillas, vista previa en vivo, exportación a PDF e impresión.",
  alternates: {
    canonical: "https://cvmakerapp.vercel.app",
  },
  openGraph: {
    title: "Crea tu CV gratis en minutos | CVMakerApp",
    description:
      "Crea tu currículum profesional gratis en minutos. Sin registro y sin marca de agua: 20 plantillas, vista previa en vivo, exportación a PDF.",
    url: "https://cvmakerapp.vercel.app",
    type: "website",
    locale: "es_ES",
    siteName: "CVMakerApp",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CVMakerApp — Crea tu currículum gratis en minutos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crea tu CV gratis en minutos | CVMakerApp",
    description:
      "Crea tu currículum profesional gratis en minutos. Sin registro y sin marca de agua: 20 plantillas, exporta a PDF.",
    images: ["/og.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
      {/* Datos estructurados (JSON-LD) para buscadores: WebSite +
          SoftwareApplication + FAQPage (generado desde lib/faq.ts). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://cvmakerapp.vercel.app/#website",
                name: "CVMakerApp",
                url: "https://cvmakerapp.vercel.app",
                description:
                  "Crea tu currículum profesional gratis en minutos: 20 plantillas, exporta a PDF sin registro.",
                inLanguage: "es",
              },
              {
                "@type": "SoftwareApplication",
                name: "CVMakerApp",
                url: "https://cvmakerapp.vercel.app",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web (navegador)",
                description:
                  "Generador de currículums online: rellena tus datos, elige entre 20 plantillas y descarga tu CV en PDF sin marca de agua ni registro.",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "EUR",
                },
                featureList: [
                  "20 plantillas de currículum",
                  "Vista previa en vivo",
                  "Exportación a PDF sin marca de agua",
                  "Compartir CV mediante enlace",
                  "Vista ATS",
                  "Impresión directa",
                ],
                inLanguage: "es",
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.a,
                  },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}