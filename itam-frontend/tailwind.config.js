/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandPrimary: "#ea580c", // Deep Saffron (Indian context)
        brandSecondary: "#166534", // Deep Green
        brandDark: "#1e293b",
        brandLight: "#f8fafc"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
