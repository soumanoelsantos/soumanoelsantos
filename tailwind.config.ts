
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
          text: '#F8F8F8',
          accent: '#2C2C2C'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgba(196,161,77,0.15) 0%, rgba(0,0,0,0.9) 70%)',
        'hero-pattern': 'url("/bg-pattern.png")',
      },
      boxShadow: {
        'modern': '0 10px 30px rgba(196, 161, 77, 0.15)',
        'gold': '0 0 15px rgba(196, 161, 77, 0.3)',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
