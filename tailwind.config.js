/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5853d5",
          secondary: "#B181F0",
          accent: "#F2FB88",
          neutral: "#20232B",
          "base-100": "#131519",
        },
      },
    ],
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        "25/75": "25% 75%",
      },
    },
  },
  plugins: [require("daisyui")],
};
