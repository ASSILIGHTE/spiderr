/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spider: {
          red: '#E50914',
          'red-dark': '#8B0000',
          'red-glow': '#FF2A3B',
          blue: '#0055FF',
          'blue-dark': '#001A66',
          'blue-glow': '#3388FF',
          dark: '#0B0C10',
          darker: '#050608',
          card: '#16181E',
          accent: '#FFCC00'
        }
      },
      fontFamily: {
        comic: ['Bangers', 'Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        handwritten: ['Caveat', 'Dancing Script', 'cursive']
      },
      boxShadow: {
        'spider-glow': '0 0 25px rgba(229, 9, 20, 0.6), 0 0 50px rgba(229, 9, 20, 0.2)',
        'blue-glow': '0 0 25px rgba(0, 85, 255, 0.6), 0 0 50px rgba(0, 85, 255, 0.2)',
        'comic': '6px 6px 0px #000000',
        'comic-red': '6px 6px 0px #E50914',
        'comic-blue': '6px 6px 0px #0055FF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'web-swing': 'webSwing 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(229,9,20,0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(229,9,20,1))' },
        },
        webSwing: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    },
  },
  plugins: [],
}
