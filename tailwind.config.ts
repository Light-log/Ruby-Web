import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ruby: {
          red: "#E63946", // Ruby Red (CTA)
          burnt: "#D00000", // Burnt Orange / deep red
        },
        gunmetal: {
          950: "#0F172A",
          900: "#1D1E2C",
        },
        silver: "#8D99AE",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-open-sans)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(230,57,70,.35), 0 0 40px rgba(230,57,70,.20)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
