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
        /* Fondo blanco cálido inspirado en el pelaje de Zoroark Hisui */
        dark: {
          DEFAULT: "#F5F1EC",
          50: "#EDE8E3",
          100: "#FFFFFF",
          200: "#F0ECE7",
          300: "#E5E0DA",
        },
        crimson: {
          DEFAULT: "#C41E3A",
          light: "#E8294A",
          dark: "#8B1A2B",
          50: "rgba(196,30,58,0.05)",
          100: "rgba(196,30,58,0.10)",
          200: "rgba(196,30,58,0.20)",
        },
        ivory: {
          DEFAULT: "#1A1A2E",
          dim: "#3D3D55",
          muted: "#6B6B85",
        },
        lavender: {
          DEFAULT: "#7C5CBF",
          light: "#A78BFA",
          dark: "#5B3D99",
        },
        silver: "#8D8DA0",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-open-sans)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(196,30,58,.30), 0 0 40px rgba(196,30,58,.12)",
        "glow-lg": "0 0 60px rgba(196,30,58,.18), 0 0 120px rgba(124,92,191,.08)",
        "glow-lavender": "0 0 0 1px rgba(124,92,191,.30), 0 0 40px rgba(124,92,191,.12)",
        card: "0 2px 16px rgba(0,0,0,.06), 0 1px 0 rgba(0,0,0,.03)",
        "card-hover": "0 8px 30px rgba(0,0,0,.10), 0 2px 0 rgba(0,0,0,.03)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "rotate(215deg) translateX(-500px)", opacity: "0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "gradient-shift": "gradient-shift 6s ease infinite",
        meteor: "meteor 5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
