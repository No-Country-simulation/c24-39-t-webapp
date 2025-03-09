import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

// import { plugin, content } from 'flowbite-react/tailwind';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#f3f4f6",
        accent: "#2563eb",
      },
	fontFamily: {
		"lobster": ["Lobster", "sans-serif"],
	},
    },
  },
  plugins: [
	flowbite.plugin(),
	require("@tailwindcss/line-clamp"),	
],
} satisfies Config;
