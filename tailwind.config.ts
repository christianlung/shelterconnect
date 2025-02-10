import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          '50': '#f2f9f9',
          '100': '#ddf0f0',
          '200': '#bee1e3',
          '300': '#91cbcf',
          '400': '#5dacb3',
          '500': '#408d94',
          '600': '#397781',
          '700': '#34626a',
          '800': '#315159',
          '900': '#2c464d',
          '950': '#192d33',
        },
        secondary: {
          '50': '#faf6f6',
          '100': '#f5eeee',
          '200': '#ecdfe0',
          '300': '#ddc4c8',
          '400': '#c3979f',
          '500': '#b3808b',
          '600': '#9b6371',
          '700': '#80505e',
          '800': '#6d4452',
          '900': '#5e3d48',
          '950': '#331e25',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
