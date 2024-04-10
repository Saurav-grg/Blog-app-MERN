/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        smd: '900px',
        xsm: '475px',
      },
      colors: {
        primary: '#71C9CE',
        secondary: '#A6E3E9',
        light: '#E3FDFD',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
