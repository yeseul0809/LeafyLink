import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      zIndex: {
        '1000': '1000'
      },
      screens: {
        xs: { max: '375px' },
        max_lg: { max: '1024px' },
        max_md: { max: '768px' },
        max_sm: { max: '640px' },
        sm: '640px',
        md: '768px',
        lg: '1024px'
      },
      colors: {
        'primary-green-50': '#f7fdfa',
        'primary-green-100': '#d1f0df',
        'primary-green-200': '#aae4c4',
        'primary-green-300': '#83d7a9',
        'primary-green-400': '#5dcb8e',
        'primary-green-500': '#3BB873',
        'primary-green-600': '#2f935c',
        'primary-green-700': '#236c44',
        'primary-green-800': '#236c44',
        'secondary-yellow-50': '#fefefa',
        'secondary-yellow-100': '#F9F3CF',
        'secondary-yellow-200': '#f3e7a0',
        'secondary-yellow-300': '#eddc72',
        'secondary-yellow-400': '#e8d145',
        'secondary-yellow-500': '#dec21c',
        'secondary-yellow-600': '#b19b16',
        'grayscale-gray-50': '#f7f7f7',
        'grayscale-gray-100': '#dedede',
        'grayscale-gray-200': '#c4c4c4',
        'grayscale-gray-300': '#ababab',
        'grayscale-gray-400': '#919191',
        'grayscale-gray-500': '#787878',
        'grayscale-gray-600': '#5e5e5e',
        'grayscale-gray-700': '#454545',
        'font/main': '#111111',
        'font/sub1': '#555555',
        'font/sub2': '#767676',
        'font/Disabled': '#999999',
        'Line/Light': '#f1f1f5',
        'Line/Regular': '#e5e5ec',
        'Line/Strong': '#111111',
        'Line/Disabled': '#cacad7',
        'BG/Light': '#F7F7FB',
        'BG/Regular': '#F1F1F5'
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)']
      },
      fontSize: {
        '32px': '32px',
        '20px': '20px',
        '18px': '18px',
        '16px': '16px',
        '15px': '15px',
        '14px': '14px',
        '13px': '13px'
      },
      lineHeight: {
        '42px': '42px',
        '28px': '28px',
        '26px': '26px',
        '24px': '24px',
        '22px': '22px',
        '20px': '20px',
        '18px': '18px'
      },
      letterSpacing: {
        '-0.8px': '-0.8px',
        '-0.5px': '-0.5px',
        '-0.4px': '-0.4px',
        '-0.45px': '-0.45px',
        '-0.375px': '-0.375px',
        '-0.35px': '-0.35px',
        '-0.325px': '-0.325px'
      },
      flex: {
        '1-0-0': '1 0 0'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
    function ({ addComponents }: { addComponents: PluginAPI['addComponents'] }) {
      addComponents({
        '.text-32-sb-42-80': {
          fontSize: '32px',
          fontWeight: '600',
          fontStyle: 'normal',
          lineHeight: '42px',
          letterSpacing: '-0.8px'
        },
        '.text-20-sb-28-50': {
          fontSize: '20px',
          fontWeight: '600',
          fontStyle: 'normal',
          lineHeight: '28px',
          letterSpacing: '-0.5px'
        },
        '.text-18-n-26-45': {
          fontSize: '18px',
          fontWeight: '400',
          fontStyle: 'normal',
          lineHeight: '26px',
          letterSpacing: '-0.45px'
        },
        '.text-18-sb-26-45': {
          fontSize: '18px',
          fontWeight: '600',
          fontStyle: 'normal',
          lineHeight: '26px',
          letterSpacing: '-0.45px'
        },
        '.text-16-n-24-40': {
          fontSize: '16px',
          fontWeight: '400',
          fontStyle: 'normal',
          lineHeight: '24px',
          letterSpacing: '-0.4px'
        },
        '.text-15-n-22-375': {
          fontSize: '15px',
          fontWeight: '400',
          fontStyle: 'normal',
          lineHeight: '22px',
          letterSpacing: '-0.375px'
        },
        '.text-14-n-20-35': {
          fontSize: '14px',
          fontWeight: '400',
          fontStyle: 'normal',
          lineHeight: '20px',
          letterSpacing: '-0.35px'
        },
        '.text-14-sb-20-35': {
          fontSize: '14px',
          fontWeight: '600',
          fontStyle: 'normal',
          lineHeight: '20px',
          letterSpacing: '-0.35px'
        },
        '.text-13-n-18-325': {
          fontSize: '13px',
          fontWeight: '400',
          fontStyle: 'normal',
          lineHeight: '18px',
          letterSpacing: '-0.325px'
        },
        '.webkit-box': {
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      });
    }
  ]
};

export default config;
