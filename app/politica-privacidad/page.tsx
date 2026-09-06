export default function PrivacyPolicy() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #E4E2DC", background: "#fff" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill="#1A1918"/>
              <text x="16" y="22" textAnchor="middle" fontSize="17" fill="white" fontFamily="serif" fontWeight="700">R</text>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>CVMakerApp</span>
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>Política de Privacidad</h1>
        <p style={{ fontSize: 13, color: "#9C9890", margin: "0 0 32px", fontFamily: "var(--font-instrument), sans-serif" }}>Última actualización: Septiembre 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            {
              title: "Responsable del tratamiento",
              content: "CVMakerApp (en adelante, \"nosotros\", \"nos\" o \"sitio\") no recopila ningún dato personal de los usuarios. Este sitio funciona íntegramente en el navegador del usuario y no envía información a ningún servidor externo, excepto para la generación de archivos PDF y Markdown exportados por el propio usuario."
            },
            {
              title: "Datos que no recopilamos",
              content: "No recopilamos, almacenamos ni tratamos datos personales de ningún tipo. No usamos cookies de seguimiento, analíticas ni publicitarias. No compartimos información con terceros."
            },
            {
              title: "Datos que tú nos proporcionas",
              content: "Los datos que introduces en el editor (nombre, experiencia laboral, educación, habilidades, etc.) se almacenan exclusivamente en la memoria de tu navegador (localStorage) y en ningún momento se transmiten a nuestros servidores. Tú eres el único responsable de exportar y guardar tus datos."
            },
            {
              title: "Cookies",
              content: "Este sitio no utiliza cookies. No usamos ningún mecanismo de seguimiento ni almacenamiento que requiera consentimiento previo según el Reglamento General de Protección de Datos (RGPD)."
            },
            {
              title: "Exportación de datos",
              content: "Cuando exportas tu CV a PDF o Markdown, el procesamiento se realiza localmente en tu dispositivo. Los archivos generados son descargados directamente por ti y no se almacenan en nuestros servidores."
            },
            {
              title: "Tus derechos",
              content: "Al no recopilar ningún dato personal, no hay datos tuyos que podamos compartir, corregir o eliminar. Si has exportado y almacenado tus archivos CV en tu dispositivo, eres el único responsable de su custodia."
            },
            {
              title: "Cambios en esta política",
              content: "Podemos actualizar esta política ocasionalmente. Cualquier cambio se publicará en esta misma página con una fecha de \"última actualización\" revisada."
            },
            {
              title: "Contacto",
              content: "Si tienes preguntas sobre esta política, puedes contactar con nosotros a través del repositorio de GitHub: github.com/TirsoCode/resumecraft"
            }
          ].map((section) => (
            <div key={section.title}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#1A1918", fontFamily: "var(--font-instrument), sans-serif" }}>{section.title}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4843", margin: 0, fontFamily: "var(--font-instrument), sans-serif" }}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #E4E2DC", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#9C9890", margin: 0, fontFamily: "var(--font-instrument), sans-serif" }}>
          © {new Date().getFullYear()} CVMakerApp
        </p>
      </footer>
    </main>
  );
}
