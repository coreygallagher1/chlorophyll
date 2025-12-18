import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chlorophyll: {
          // Light green (lime/yellowish-green from logo)
          light: "#a8e063",
          "light-50": "#f0f9e8",
          "light-100": "#ddf2c4",
          "light-200": "#c8ea9a",
          "light-300": "#a8e063",
          // Emerald green (darker green from logo)
          emerald: "#2d8659",
          "emerald-50": "#e8f5ed",
          "emerald-100": "#c4e4d3",
          "emerald-200": "#9dd1b5",
          "emerald-300": "#6fb88f",
          "emerald-400": "#2d8659",
          "emerald-500": "#246b48",
          "emerald-600": "#1d5539",
          "emerald-700": "#16422c",
          "emerald-800": "#0f2e1e",
          "emerald-900": "#0a1f14"
        }
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem"
      }
    }
  },
  plugins: []
};

export default config;


