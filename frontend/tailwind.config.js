export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hannah': ['Hannah Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'hannah-blue': '#1a73e8',
        'hannah-gray': '#5f6368',
      }
    },
  },
  plugins: [],
}
