/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 20px rgba(255, 255, 255, 0.1)',
        deep: '0 10px 30px rgba(0, 0, 0, 0.6)',
      },
      textShadow: {
        subtle: '0 1px 3px rgba(255, 255, 255, 0.1)',
        strong: '0 0 8px rgba(255, 255, 255, 0.35)',
        'glow-orange': '0 0 12px #f47800',
        'glow-cyan': '0 0 12px #00B8B8',
        'soft-white': '0 0 6px rgba(255, 255, 255, 0.6)',
      },
      colors: {
        turkices: '#0C6166',
        obaura: '#F14F00',
        darkis: '#1A2724',
        obcen: '#FFFFFF',

        // Dodate Modovate brend boje
        'brand-dark': '#072C3C',
        'brand-accent': '#00B8B8',
        'brand-orange': '#F47800',
        'brand-light': '#5CD7E0',
        'brand-black': '#000000',
        'brand-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Montserrat', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};
