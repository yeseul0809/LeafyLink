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

        '1000':'1000',
      },
      colors: {
        'primary-green-50': '#f7fdfa',
        'primary-green-100': '#d1f0df',
        'primary-green-200': '#aae4c4',
        'primary-green-300': '#83d7a9',
        'primary-green-400': '#5dcb8e',
        'primary-green-500': '#3BB873',
        'primary-green-600': '#2f935c',
        'primary-green-700': '#2f935c',
        'primary-green-800': '#236c44',
        'secondary-main-50': '#F9F3CF',
        'secondary-main-100': '#F9F3CF',
        'secondary-main-200': '#F9F3CF',
        'secondary-main-300': '#F9F3CF',
        'secondary-main-400': '#F9F3CF',


      }
    },
  },
  plugins: [],
};

export default config;
