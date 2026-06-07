/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
colors: {
  primary: {
    50:  "#EEF1F3",
    100: "#D5DCE2",
    200: "#ADBBC6",
    300: "#8699A9",
    400: "#60798D",
    500: "#4C6173",
    600: "#3A4C5C",
    700: "#293845",
    800: "#1A2730",
    900: "#10181D",
    950: "#0A1115",
  },
  accent: {
    50:  "#FAF5EF",
    100: "#F2E6D4",
    200: "#E4CEAF",
    300: "#D6B68A",
    400: "#C49A65",
    500: "#B28248",
    600: "#956B38",
    700: "#74522A",
    800: "#553C1E",
    900: "#382813",
    950: "#28180B",
  },
},
    },
  },
  plugins: [],
};
