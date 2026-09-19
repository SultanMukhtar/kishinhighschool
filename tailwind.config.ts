import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kishin: {
          black: "#0a0a0a",
          charcoal: "#121212",
          panel: "#161414",
          maroon: "#3a0d0d",
          maroon2: "#5c1414",
          red: "#c81e2c",
          redlight: "#e8384a",
          gray: "#8a8a8a",
          white: "#f5f2f0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "grain": "url('/assets/grain.png')",
      },
      boxShadow: {
        "red-glow": "0 0 40px -10px rgba(200,30,44,0.5)",
        "red-glow-sm": "0 0 20px -5px rgba(200,30,44,0.45)",
      },
      keyframes: {
        kenburns: {
          "0%": { transform: "scale(1) translate(0,0)" },
          "100%": { transform: "scale(1.15) translate(-1%,-1%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        kenburns: "kenburns 16s ease-out forwards",
        fadeIn: "fadeIn 1s ease-in-out",
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
