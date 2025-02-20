import textShadow from "tailwindcss-textshadow";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sourceSerif: ["SourceSerif", "serif"],
      },
      textShadow: {
        black:
          "1px 1px 0 black, 2px 2px 0 black, 3px 3px 0 black",
        header: 
           "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black",
      },
    },
  },
  plugins: [textShadow],
};

export default config;

