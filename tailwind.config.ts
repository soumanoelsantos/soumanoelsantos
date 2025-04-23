
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0A0A0A',
          primary: '#C4A14D',
          secondary: '#1E1E1E',
          text: '#E0E0E0',
          accent: '#2C2C2C'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgba(196,161,77,0.1) 0%, rgba(0,0,0,0.8) 70%)',
      },
      boxShadow: {
        'modern': '0 10px 30px rgba(196, 161, 77, 0.1)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
