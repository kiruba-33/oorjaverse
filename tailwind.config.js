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

      // ADD THIS BELOW TO FIX z-[9999] WARNING 👇
      zIndex: {
        9999: "9999", // now no yellow underline ✔
        999: "999",   // optional: use for modals
        100: "100",   // optional: dropdowns
      },
    },
  },
  plugins: [],
};
