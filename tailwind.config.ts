import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Nexus Circle
        background: {
          primary: "#0B0B0B",
          secondary: "#111111",
        },
        border: {
          subtle: "#1E1E1E",
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#B5B5B5",
          muted: "#6F6F6F",
        },
        gold: {
          DEFAULT: "#C7B38A",
          hover: "#A89263",
        },
        // Garder primary pour compatibilité, mais utiliser gold comme accent
        primary: {
          DEFAULT: "#C7B38A",
          50: "#faf9f6",
          100: "#f5f2eb",
          200: "#e8e0d0",
          300: "#d9ccb5",
          400: "#C7B38A",
          500: "#C7B38A",
          600: "#A89263",
          700: "#8a7550",
          800: "#6b5a3f",
          900: "#4d3f2e",
        },
      },
    },
  },
  plugins: [],
};
export default config;

