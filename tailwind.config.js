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
        darkgold2: '#9d7154',
        gold: '#D7C392',
        lightgold: '#e9ddbf',
        lightgold2: '#dfd4a7',
        black: '#303030',
        darkTheme: '#464a4e',
        white: '#f0f0f0',
        white2: '#ffffff',
      },
      height: {
        8: '8vh',
        10: '10vh',
        80: '80vh',
        99: '28rem',
      },
      width: {
        25: '25%',
        headerMd: '28rem',
        headerLg: '35rem',
        18: '17rem',
      },
      maxWidth: {
        8: '90rem',
      },
      minHeight: {
        8: '8vh',
        10: '10vh',
        35: '35rem',
        45: '45rem',
        80: '80vh',
        100: '100vh',
      },
      maxHeight: {
        35: '35rem',
      },
    },
  },
  plugins: [],
};
