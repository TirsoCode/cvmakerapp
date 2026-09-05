import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeCraft — Crea CVs profesionales en minutos",
  description: "Generador de currículums vitae con plantillas premium, exporta a PDF. Sin registro, sin tracking, tus datos son tuyos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231A1918'/><text x='16' y='22' text-anchor='middle' font-size='18' fill='white' font-family='serif'>R</text></svg>" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
