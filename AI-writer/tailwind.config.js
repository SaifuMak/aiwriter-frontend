/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        'custom-dark':'#213343',
        'custom-dark-orange':'#FB923C',
        'custom-light-orange':'#FEE3CE',
        'custom-black-text':'#213343',
        'hover-button-color':'#f6a665',
      },
    },
  },
  plugins: [],
}

