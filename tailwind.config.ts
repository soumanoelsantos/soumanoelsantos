
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
          primary: '#D4AF37',  // More luxurious gold color
          secondary: '#1E1E1E',
          text: '#F8F8F8',
          accent: '#2C2C2C'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.95) 70%)',
        'hero-pattern': 'url("/bg-pattern.png")',
      },
      boxShadow: {
        'modern': '0 20px 40px rgba(212,175,55,0.15)',
        'gold': '0 0 20px rgba(212,175,55,0.3)',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
