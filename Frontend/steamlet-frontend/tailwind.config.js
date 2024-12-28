/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths if necessary
  ],
  theme: {
    extend: {},
    colors:{
      turquoise:'rgb(128,172,170)',
      darkerBrown:'rgb(92,59,27)',
      paleYellow:'rgb(253,217,120)',
      darkerpaleYellow:'rgb(223,187,90)',
      burgundy:'rgb(110,47,59)',
    }
  },
  plugins: [],
}

