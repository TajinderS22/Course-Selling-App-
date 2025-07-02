// @type {import('tailwindcss').Config} 
import scrollbarHide from 'tailwind-scrollbar-hide'

const tailwindcssConfig= {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: 'selector',
    theme: {
      extend: {
        keyframes: {
          shimmer: {
            '0%': { backgroundPosition: '-100% 0' },
            '100%': { backgroundPosition: '100% 0' },
          }
        },
        animation: {
          shimmer: 'shimmer 1.5s infinite linear',
        }
      },
    },
    plugins: [
      scrollbarHide
    ],
  }

export default tailwindcssConfig