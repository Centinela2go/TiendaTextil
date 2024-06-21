/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'drawer-open': 'calc(100% - 256px)',
        'drawer-open-3xl': 'calc(100% - 288px)',
        'drawer': 'calc(100% - 64px)',
        'drawer-3xl': 'calc(100% - 96px)',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    }
  },
  plugins: [],
}