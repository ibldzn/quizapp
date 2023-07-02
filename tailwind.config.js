const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: ["Silkscreen", ...defaultTheme.fontFamily.sans],
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          "cerulean-blue": "#374CB7",
          "cerulean-blue-dark": "#3244a5",
          "storm-dust": "#636262",
          "white-smoke": "#F5F5F5",
          "white-smoke-100": "#F6F6F6",
          bittersweet: "#FF6A66",
          "bittersweet-dark": "#e65f5c",
          haiti: "#1B0330",
          "star-dust": "#9E9E9E",
          "paris-green": "#56C490",
          "light-gray": "#F2F2F2",
          midnight: "#1B0330",
          "mountain-mist": "#959595",
        },
      },
    },
  },
  plugins: [],
};
