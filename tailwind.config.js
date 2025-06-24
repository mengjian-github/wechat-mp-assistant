/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        secondary: '#5f6368',
        success: '#188038',
        warning: '#f9ab00',
        danger: '#d33b3b',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}