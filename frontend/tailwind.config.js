/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#FF1A1A',
          hover: '#CC1414'
        },
        background: '#080808',
        surface: '#111111',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.075em',
        tight: '-0.055em',
      }
    },
  },
  plugins: [],
}
