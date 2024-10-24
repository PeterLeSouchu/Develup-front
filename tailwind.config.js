/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        darkgold: '#B79178',
        gold: '#D7C392',
      },
      height: {
        8: '8vh',
        84: '84vh',
        30: '30rem',
        92: '92vh',
      },
      width: {
        25: '25%',
      },
      minHeight: {
        8: '8vh',
        84: '84vh',
        100: '100vh',
      },
      backdropBlur: {
        mini: '1px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
