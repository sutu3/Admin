/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  extend: {
    // Add custom class for hiding scrollbar
    hideScrollbar: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',  /* Internet Explorer 10+ */
      'scrollbar-width': 'none',  /* Firefox */
    }
  },
  darkMode: "class",
  plugins: []
}

