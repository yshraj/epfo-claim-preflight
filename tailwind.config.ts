import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1", // Strong trusted blue
          800: "#075985",
          900: "#0C4A6E", // Deep ink
          950: "#082F49",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(15,23,42,.04), 0 12px 32px rgba(15,23,42,.06)",
        glow: "0 0 20px rgba(2,132,199,.15)",
        card: "0 1px 3px rgba(15,23,42,.02), 0 4px 12px rgba(15,23,42,.04)",
      },
    },
  },
  plugins: [],
};

export default config;
