/** @type {import('next').NextConfig} */
// Build 100 % estático (output: "export"): genera HTML/CSS/JS puros en out/,
// sin servidor Node ni funciones serverless. Las imágenes se sirven tal cual
// desde /public (unoptimized) porque no existe el optimizador de imágenes.
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["next/image"],
  },
};
export default nextConfig;