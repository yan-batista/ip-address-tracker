/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        "dark-gray": {
          1: "hsl(var(--color-very-dark-gray) / <alpha-value>)",
          2: "hsl(var(--color-dark-gray) / <alpha-value>)",
        },
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
