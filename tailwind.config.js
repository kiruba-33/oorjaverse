/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7F00",
        dark: "#0A0A23",
        textGray: "#333333",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
