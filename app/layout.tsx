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
    default: "nos — Crea currículums profesionales en minutos",
    template: "%s",
  },
  description: "Generador de currículums con 20 plantillas premium, exporta a PDF y Markdown. Sin registro, sin límite, en minutos.",
  applicationName: "nos",
  keywords: ["currículum", "CV", "plantillas CV", "curriculum vitae", "crear CV gratis", "PDF"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "nos — Crea currículums profesionales en minutos",
    description: "Generador de currículums con 20 plantillas premium, exporta a PDF y Markdown. Sin registro, sin límite, en minutos.",
    type: "website",
    locale: "es_ES",
    siteName: "nos",
    url: "https://cvmakerapp.vercel.app",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "nos" }],
  },
  twitter: {
    card: "summary",
    title: "nos — Crea currículums profesionales en minutos",
    description: "Generador de currículums con 20 plantillas premium, exporta a PDF y Markdown. Sin registro, sin límite, en minutos.",
    images: ["/logo.png"],
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
  themeColor: "#1A1918",
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