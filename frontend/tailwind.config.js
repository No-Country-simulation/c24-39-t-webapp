const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#f3f4f6",
        cream: "#fafae9",
        logo: "#ffba05",
        element: "#000000",
      },
      fontFamily: {
        "lobster": ["Lobster", "sans-serif"],
      },
    },
  },
    plugins: [
      flowbite.plugin(),
    ],
};
