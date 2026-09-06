import type { Metadata } from "next";
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
  title: "CVMakerApp — Crea currículums profesionales en minutos",
  description: "Generador de currículums con 20 plantillas premium, exporta a PDF y Markdown. Sin registro, sin límite, en minutos.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CVMakerApp — Crea currículums profesionales en minutos",
    description: "Generador de currículums con 20 plantillas premium, exporta a PDF y Markdown. Sin registro, sin límite, en minutos.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231A1918'/><text x='16' y='22' text-anchor='middle' font-size='18' fill='white' font-family='serif'>R</text></svg>" />
      </head>
      <body
        className={`antialiased ${playfair.variable} ${instrument.variable} ${jetbrains.variable} ${sourceSerif.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${dmSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}