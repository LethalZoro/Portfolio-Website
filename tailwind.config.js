/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightGreen: "##3097BD",
        darkGreen: "#6b7280",
        darkerGreen: "#4b5563",
        lightBackground: "#F8F8F8",
        darkBackground: "#1a1a1a",
        darkBlack: "#000000",
        grayColor: "#22262D",
        yellowColor: "#FFE033",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
