import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EPFO's own site leans deep blue/teal; kept intentionally distinct
        // from any official government colour scheme to avoid implying endorsement.
        brand: {
          50: "#f2f7fb",
          100: "#e2edf7",
          200: "#c3d9f0",
          300: "#93b9e3",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#1e2a5c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,.04), 0 8px 24px rgba(15,23,42,.06)",
      },
    },
  },
  plugins: [],
};

export default config;
