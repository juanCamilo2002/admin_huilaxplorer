/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          600: '#0A7C00',
          500: '#0b9800',
          400: '#0cb300',
          300: '#0ecc00',
          200: '#B2E0AE',
          
        },
        secondary: {
          200: '#E9F3EC',
        },
        alert: {
          100: '#DE9D1E'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
