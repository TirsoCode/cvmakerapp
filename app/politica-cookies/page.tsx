export default function CookiesPolicy() {
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
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 8px", color: "#1A1918", fontFamily: "var(--font-playfair), serif" }}>Política de Cookies</h1>
        <p style={{ fontSize: 13, color: "#9C9890", margin: "0 0 32px", fontFamily: "var(--font-instrument), sans-serif" }}>Última actualización: Septiembre 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            {
              title: "¿Qué son las cookies?",
              content: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios funcionen de manera más eficiente o para proporcionar información a los propietarios del sitio."
            },
            {
              title: "Nuestro uso de cookies",
              content: "Este sitio web NO utiliza cookies. No empleamos cookies de sesión, cookies persistentes, cookies de primera parte ni cookies de terceros. Tu experiencia de usuario no depende de ningún mecanismo de almacenamiento basado en cookies."
            },
            {
              title: "¿Por qué no usamos cookies?",
              content: "CVMakerApp funciona íntegramente en el lado del cliente. Los datos que introduces en el editor se almacenan temporalmente en la memoria de tu navegador (localStorage) para tu comodidad durante la sesión de edición, pero esto no constituye una cookie en el sentido técnico ni legal. No existe追踪 ni seguimiento de ningún tipo."
            },
            {
              title: "Almacenamiento local (localStorage)",
              content: "Tu navegador puede almacenar los datos del editor en localStorage para que no los pierdas si cierras la pestaña accidentalmente. Estos datos permanecen en tu dispositivo y nunca se envían a ningún servidor. Puedes borrarlos limpiando los datos del sitio en la configuración de tu navegador."
            },
            {
              title: "Cookies de terceros",
              content: "No insertamos ningún código de terceros (Google Analytics, Facebook Pixel, publicidades ni servicios similares) que pueda instalar cookies en tu dispositivo. Este sitio es completamente independiente."
            },
            {
              title: "Tu consentimiento",
              content: "Dado que no utilizamos cookies, no solicitamos tu consentimiento para su uso. Sin embargo, si tu navegador muestra un aviso de cookies al entrar en el sitio, puedes informarte de que CVMakerApp no utiliza ninguna cookie y rechaza o ignora dicho aviso sin consecuencias."
            },
            {
              title: "Cómo desactivar el almacenamiento local",
              content: "Si deseas impedir que el navegador almacene datos de CVMakerApp, puedes borrar los datos del sitio en la configuración de privacidad de tu navegador, o bien usar el botón \"Reset\" en el editor para eliminar los datos guardados."
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
