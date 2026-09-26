// FAQ de la landing, compartido entre el componente client (app/home-client.tsx)
// y los datos estructurados FAQPage del wrapper server (app/page.tsx).
// Si añades una pregunta, actualiza ambas superficies automáticamente (misma
// fuente) y la web la refleja en el JSON-LD.
export const FAQ: { q: string; a: string }[] = [
  { q: "¿Necesito registrarme?", a: "No. Abre la web, escribe y descarga. No pedimos email ni contraseña ni permiso para nada." },
  { q: "¿Cuánto cuesta?", a: "Nada. La herramienta es gratis, sin planes ocultos y sin marca de agua en el PDF." },
  { q: "¿Dónde se guardan mis datos?", a: "Solo en tu navegador. Nada se sube a ningún servidor, así que tu CV no puede acabar en manos de nadie." },
  { q: "¿Puedo exportar mi CV en PDF?", a: "Sí, con un clic obtienes un PDF A4 listo para enviar. También puedes imprimir directamente." },
  { q: "¿Puedo compartir mi CV?", a: "Sí. Generas un enlace corto con tu CV comprimido; quien lo abra podrá verlo y descargarlo sin registrarse." },
];
