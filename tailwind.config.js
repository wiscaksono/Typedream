/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kaushan: ["Kaushan Script"],
      },
      colors: {
        primary: "#181818",
        seconday: "#1C1C1C",
        custom: {
          blue: "#312EB5",
        },
      },
      borderRadius: {
        3: "3px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
