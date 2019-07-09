const {
  colors
} = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'default': '0 4px 5px 0 rgba(0, 0, 0, .13), 0 3px 4px 0 rgba(0, 0, 0, .08)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, .3)',
        'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        'outline': '0 0 0 3px rgba(66,153,225,0.5)',
        'focus': '0 0 0 3px rgba(66,153,225,0.5)',
        'none': 'none',
      },
      fontSize: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      fontFamily: {
        'silkaBlack': ['Silka Black'],
        'silkaBold': ['Silka Bold'],
        'silkaExtraLight': ['Silka ExtraLight'],
        'silkaLight': ['Silka Light'],
        'silkaMedium': ['Silka Medium'],
        'silkaRegular': ['Silka Regular'],
        'silkaSemiBold': ['Silka SemiBold'],
        'silkaThin': ['Silka Thin'],
        'sans': ['Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif'],
      },
      // spacing: {
      //   sm: '8px',
      //   md: '16px',
      //   lg: '24px',
      //   xl: '48px',
      // },
      fill: theme => ({
        'indigo': theme('colors.indigo.500')
      }),
      colors: {
        gray: {
          ...colors.gray,
          '100': '#f8f8f8',
        },
        teal: {
          ...colors.teal,
          '200': '#63D2F9'
        },
        blue: {
          ...colors.blue,
          '300': '#63B0F9',
          '900': '#282846',
        },
        indigo: {
          ...colors.indigo,
          '500': '#4E5EE4',
        },
      },
      container: {
        center: true,
        padding: '2rem',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        'lg': '768px',
        'xl': '1020px',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
      })
    },
  },
  variants: {},
  plugins: []
}
