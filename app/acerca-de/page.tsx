import type { Metadata } from "next";

// Página "Acerca de": identidad del proyecto y contacto. No aporta keywords
// propias ni debe competir con la landing en buscadores, así que sigue el
// mismo patrón que las legales: metadata estática, noindex + canonical.
export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "Quién está detrás de CVMakerApp: un generador de currículums gratuito, privado y sin registro. Principios del proyecto y contacto.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://cvmakerapp.vercel.app/acerca-de",
  },
};

// TODO CONTACTO: mismo email que el footer de la landing (app/home-client.tsx).
// Si lo cambias en uno, cámbialo en el otro.
const CONTACT_EMAIL = "hola@cvmakerapp.com";
const REPO_URL = "https://github.com/TirsoCode/cvmakerapp";

const SERIF = "var(--font-playfair), serif";
const SANS = "var(--font-instrument), sans-serif";

const SECTIONS: { title: string; content: string }[] = [
  {
    title: "Quién está detrás",
    content:
      "CVMakerApp es un proyecto independiente de una sola persona: sin equipo, sin patrocinadores y sin inversores detrás. Soy un desarrollador que pasó demasiado tiempo peleándose con generadores de CV que exigen registro, guardan tus datos en sus servidores y cobran por la exportación. Esta web es la respuesta a eso: todas las funciones, gratis, sin cuenta y sin que nada salga de tu navegador.",
  },
  {
    title: "Por qué existe",
    content:
      "Encontrar trabajo es jugar a la ruleta: muchos currículums se descartan antes de que nadie los lea, casi siempre por el formato o por una línea mal preparada para los filtros automáticos. Quería una herramienta que no pusiera pegas: escribes tus datos, ves el resultado al instante y descargas el PDF sin más vueltas.",
  },
  {
    title: "Los principios",
    content:
      "Gratis de verdad: no hay plan de pago ni funciones bloqueadas. Privado: nada se sube a ningún servidor, sin analítica ni cookies de seguimiento. Honesto: sin marca de agua, sin anuncios y sin letra pequeña. Y abierto: el código está publicado para que cualquiera pueda auditar lo que la web hace con tu CV.",
  },
  {
    title: "Con qué está hecho",
    content:
      "Next.js 14, React y TypeScript, con un export 100 % estático. El PDF se genera en tu propio dispositivo con html2canvas y jsPDF, y los enlaces para compartir comprimen el CV con lz-string dentro de la propia URL. Es decir: sin backend y sin servicios de terceros.",
  },
  {
    title: "Limitaciones asumidas",
    content:
      "El CV no se guarda al recargar la página, y es una decisión consciente: si quieres conservarlo, usa Compartir para generar un enlace o descarga el PDF. No hay cuentas de usuario porque no hay dónde mandar tus datos; el precio de esa privacidad es que no podemos recuperar un CV que perdiste.",
  },
  {
    title: "Contacto",
    content:
      "Puedes escribir a hola@cvmakerapp.com para cualquier duda, o abrir una incidencia en el repositorio de GitHub, que suele ser la vía más rápida. Las correcciones y las sugerencias de nuevas plantillas son bienvenidas.",
  },
];

export default function AboutPage() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #E4E2DC", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1918", fontFamily: SERIF }}>CVMakerApp</span>
          </a>
          <a href="/editor" style={{ fontSize: 12, fontWeight: 600, color: "#C0392B", textDecoration: "none" }}>Crear mi CV</a>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "#1A1918", fontFamily: SERIF }}>Acerca de CVMakerApp</h1>
        <p style={{ fontSize: 13, color: "#9C9890", margin: "0 0 32px", fontFamily: SANS }}>Un generador de currículums gratuito, privado y sin registro.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#1A1918", fontFamily: SANS }}>{section.title}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4843", margin: 0, fontFamily: SANS }}>{section.content}</p>
            </div>
          ))}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 13, fontWeight: 600, color: "#C0392B", textDecoration: "none" }}>{CONTACT_EMAIL}</a>
            <a href={REPO_URL} style={{ fontSize: 13, fontWeight: 600, color: "#6B6860", textDecoration: "none" }}>Repositorio de GitHub</a>
          </div>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #E4E2DC", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#9C9890", margin: 0, fontFamily: SANS }}>
          © {new Date().getFullYear()} CVMakerApp
        </p>
      </footer>
    </main>
  );
}
