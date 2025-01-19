/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   pink: {
      //     50: '#fdf2f8',
      //     100: '#fce7f3',
      //     200: '#fbcfe8',
      //     300: '#f9a8d4',
      //     400: '#f472b6',
      //     500: '#ec4899',
      //     600: '#db2777',
      //     700: '#be185d',
      //     800: '#9d174d',
      //     900: '#831843',
      //   },
      //   primary: {
      //     50: '#FDF2F8',
      //     100: '#FCE7F3',
      //     200: '#FBCFE8',
      //     300: '#F9A8D4',
      //     400: '#F472B6',
      //     500: '#EC4899',
      //     600: '#DB2777',
      //     700: '#BE185D',
      //     800: '#9D174D',
      //     900: '#831843',
      //   },
      //   background: '#FDF2F8', // Light pink background
      // },
      colors: {
        background: '#FFF5F7',  // Even lighter pink background
        primary: {
          50: '#FFF5F7',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        glow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 0.5rem #EC4899)' },
          '50%': { filter: 'drop-shadow(0 0 1rem #EC4899)' },
        }
      },
    },
  },
  plugins: [],
}
