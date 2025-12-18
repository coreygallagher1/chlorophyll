import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chlorophyll: {
          50: "#f4fbf6",
          100: "#e5f7ea",
          200: "#c5ebd0",
          300: "#93d7a8",
          400: "#57b872",
          500: "#2f974d",
          600: "#22763a",
          700: "#1d5d30",
          800: "#174627",
          900: "#123820"
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


