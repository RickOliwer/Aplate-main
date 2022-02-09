module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
          '50vh': '50vh',
          '55vh': '55vh',
          '60vh': '60vh',
          '65vh': '65vh',
          '70vh': '70vh',
          '75vh': '75vh',
          '80vh': '80vh',
          '85vh': '85vh',
          '90vh': '90vh',

      },
      colors: {
        aplate: {
          rost: '#8E443D',
          white: '#ffffff',
          black: '#0C0C0C',
          green: '#0f4127cc'
        },
        capace: {
          oranges: '#FF752E', 
        }
      }
    },
  },
  plugins: [],
}