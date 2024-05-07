/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: 'Oswald',
      },
      backgroundImage: {
        'basic': "url('assets/images/waves.svg')",
      },
      colors: {
        'creamy': '#FFFFF3',
        'navyblue': '#001d33',
      },
      boxShadow: {
        'basic': '0 5px 0 rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}

