/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8C1007",   
        secondary: "#3E0703", 
        thirty: "#660B05",    
        ternary: "#FFF0C4",
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        sans: ["Google Sans", "Inter", "sans-serif"],
      },
      // Implementasi Grid 12:8:4
      gridTemplateColumns: {
        'mobile': 'repeat(4, minmax(0, 1fr))',
        'tablet': 'repeat(8, minmax(0, 1fr))',
        'desktop': 'repeat(12, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}