
/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode:"class",
  plugins: [typography],
}