// @type {import('tailwindcss').Config} 
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
    plugins: [],
  }

export default tailwindcssConfig