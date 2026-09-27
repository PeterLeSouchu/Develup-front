/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xss: '500px',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        pollen: {
          DEFAULT: '#FFCC33',
          soft: '#FFF4CC',
          deep: '#7A5A00',
        },
        ink: '#1E1D1B',
        night: {
          DEFAULT: '#1A1917',
          surface: '#24221F',
          line: '#393631',
          muted: '#A9A59C',
        },
        paper: '#F5F5F2',
        line: '#E3E2DC',
        muted: '#66635C',
        darkgold: '#B79178',
        darkgold2: '#9d7154',
        gold: '#D7C392',
        shadowGold: '#F3EAD2',
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
        55: '60rem',
      },
      minHeight: {
        8: '8vh',
        10: '10vh',
        35: '35rem',
        39: '39rem',
        45: '45rem',
        80: '80vh',
        100: '100vh',
      },
      maxHeight: {
        35: '35rem',
      },
      scale: {
        101: '1.01',
      },
    },
  },
  plugins: [],
};
