const {
  colors
} = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
      maxWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      boxShadow: {
        'default': '0 4px 5px 0 rgba(0, 0, 0, .13), 0 3px 4px 0 rgba(0, 0, 0, .08)',
        'lg': '0 6px 25px -2px rgba(0, 0, 0, 0.1), 0 4px 15px -1px rgba(0, 0, 0, 0.05)',
      },
      lineHeight: {
        relaxed: 1.75
      },
      fontSize: {
        'xxs': '0.65rem',
        'md': '1.075rem',
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
        'helveticaNeueThin': ['Helvetica Neue Thin'],
        'helveticaNeueLight': ['Helvetica Neue Light'],
        'helveticaNeueRegular': ['Helvetica Neue Regular'],
        'helveticaNeueBold': ['Helvetica Neue Bold'],
        'sans': ['Helvetica Neue', 'Helvetica', 'Roboto', 'Arial', 'sans-serif'],
      },
      opacity: {
        '0': '0',
        '10': '.1',
        '20': '.2',
        '30': '.3',
        '40': '.4',
        '50': '.5',
        '60': '.6',
        '70': '.7',
        '80': '.8',
        '90': '.9',
        '100': '1',
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
      }
    },
  },
  variants: {
    opacity: ['responsive', 'hover']
  },
  plugins: []
}
