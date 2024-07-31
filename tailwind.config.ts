import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        '1000': '1000',
      },
      colors: {
        main50: '#f7fdfa',
        main100: '#d1f0df',
        main200: '#aae4c4',
        main300: '#83d7a9',
        main400: '#5dcb8e', 
        main500: '#3BB873',  
        main600: '#2f935c',
        main700: '#236c44', 
        main800: '#16462b', 
        sub50: '#fefefa',
        sub100: '#f9f3cf',
        sub200: '#f3e7a0',
        sub300: '#eddc72',
        sub400: '#e8d145',
      }
    },
  },
  plugins: [],
};

export default config;
