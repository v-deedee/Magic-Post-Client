/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-bg": "url('/src/assets/images/home-bg.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")],
  darkMode: "class",
};
