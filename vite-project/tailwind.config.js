/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          500: '#64748b',
          900: '#0f172a',
        },
        // Mature furniture palette: warm grays, browns, golds
        wood: {
          100: '#f5f3f0',
          600: '#a67c5b',
          800: '#7a5c3d',
        },
        gold: {
          400: '#f4a261',
          600: '#e76f51',
        }
      },
    },
  },
  plugins: [],
}

