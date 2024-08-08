/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#101211",
        bgSecondary: "#171918",
        text: "#ECEEED",
        textSecondary: "#ADB5B2",
        interactive: "#272A29",
        border: "#444947",
        primary: "#1DF097",
      },
      boxShadow: {
        hover: "0 0 6px 0",
      },
    },
  },
  plugins: [],
};
