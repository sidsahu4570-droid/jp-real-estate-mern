/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
          600: '#4A6572',
        },
        gold: {
          400: '#F3C649',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#996515',
        },
        pearl: '#F8F9FA',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
