import type { Metadata, Viewport } from "next";
import {
  Playfair_Display,
  Instrument_Sans,
  JetBrains_Mono,
  Source_Serif_4,
  Space_Grotesk,
  Fraunces,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cvmakerapp.vercel.app"),
  title: {
    default: "Crea tu CV gratis en minutos | CVMakerApp",
    template: "%s | CVMakerApp",
  },
  description:
    "Crea tu currículum profesional gratis en minutos. Sin registro, sin marca de agua: 20 plantillas, vista previa en vivo y exportación a PDF.",
  applicationName: "CVMakerApp",
  keywords: [
    "currículum",
    "CV",
    "crear CV gratis",
    "hacer currículum online",
    "plantillas de CV",
    "CV profesional",
    "descargar CV en PDF",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Crea tu CV gratis en minutos | CVMakerApp",
    description:
      "Crea tu currículum profesional gratis en minutos. Sin registro, sin marca de agua: 20 plantillas y exportación a PDF.",
    type: "website",
    locale: "es_ES",
    siteName: "CVMakerApp",
    url: "https://cvmakerapp.vercel.app",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CVMakerApp — Crea tu currículum gratis en minutos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crea tu CV gratis en minutos | CVMakerApp",
    description:
      "Crea tu currículum profesional gratis en minutos. Sin registro, sin marca de agua: 20 plantillas y exportación a PDF.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F9FD",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`antialiased ${playfair.variable} ${instrument.variable} ${jetbrains.variable} ${sourceSerif.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${dmSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}