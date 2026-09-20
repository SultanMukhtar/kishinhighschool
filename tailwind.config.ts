import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backed by CSS custom properties in globals.css so the whole
        // palette re-themes at once via the [data-theme] attribute -
        // see the "THEME TOKENS" block at the top of globals.css.
        kishin: {
          black: "rgb(var(--kishin-black) / <alpha-value>)",
          charcoal: "rgb(var(--kishin-charcoal) / <alpha-value>)",
          panel: "rgb(var(--kishin-panel) / <alpha-value>)",
          maroon: "rgb(var(--kishin-maroon) / <alpha-value>)",
          maroon2: "rgb(var(--kishin-maroon2) / <alpha-value>)",
          red: "rgb(var(--kishin-red) / <alpha-value>)",
          redlight: "rgb(var(--kishin-redlight) / <alpha-value>)",
          gray: "rgb(var(--kishin-gray) / <alpha-value>)",
          white: "rgb(var(--kishin-white) / <alpha-value>)",
          gold: "rgb(var(--kishin-gold) / <alpha-value>)",
          /** Hairline borders / subtle highlight overlays - light-on-dark
           *  in dark mode, dark-on-light in light mode. */
          line: "rgb(var(--kishin-line) / <alpha-value>)",
          /** Recessed surface fills (inputs, chips, badges) - same
           *  light/dark-flip logic as `line`. */
          inset: "rgb(var(--kishin-inset) / <alpha-value>)",
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
        "red-glow": "0 0 40px -10px rgb(var(--kishin-red) / 0.5)",
        "red-glow-sm": "0 0 20px -5px rgb(var(--kishin-red) / 0.45)",
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
