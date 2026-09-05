import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FAFAF8",
        "bg-2": "#F3F2EE",
        surface: "#FFFFFF",
        border: "#E4E2DC",
        "border-2": "#CBC8C0",
        ink: "#1A1918",
        "ink-2": "#6B6860",
        "ink-3": "#9C9890",
        accent: "#C0392B",
        "accent-2": "#2563EB",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Instrument Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
    },
  },
  plugins: [],
};
export default config;
