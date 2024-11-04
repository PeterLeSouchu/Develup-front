/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        darkgold: '#B79178',
        gold: '#D7C392',
        lightgold: '#e9ddbf',
        black: '#303030',
      },
      height: {
        8: '8vh',
        10: '10vh',
        80: '80vh',
      },
      width: {
        25: '25%',
        headerMd: '28rem',
        headerLg: '35rem',
        18: '17rem',
      },
      minHeight: {
        8: '8vh',
        10: '10vh',
        84: '84vh',
        80: '80vh',
        100: '100vh',
      },
    },
  },
  plugins: [],
};
