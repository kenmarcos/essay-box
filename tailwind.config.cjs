const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#CECED2",
          400: "#3C3F78",
          500: "#222565",
        },
        secondary: {
          400: "#ee8468",
          500: "#e8491e",
        },
        black: "#0B0E16",
        white: "#F3F3F3",
      },
    },
    fontFamily: {
      sans: ["Cairo", "sans-serif"],
    },
  },
  plugins: [],
});
