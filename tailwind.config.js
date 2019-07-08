module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          '100': '#f8f8f8',
        },
        indigo: '#5c6ac4',
      },
      container: {
        center: true,
        padding: '2rem',
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
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
