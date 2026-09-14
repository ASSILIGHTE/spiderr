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
          red: '#FF2A85',         // Hot Neon Spider Pink
          'red-dark': '#880044',    // Deep Magenta Dark
          'red-glow': '#FF66B2',    // Bright Pink Glow
          blue: '#7B2CBF',        // Soft Purple / Gwen Lavender Accent
          'blue-dark': '#240046',
          'blue-glow': '#00E5FF',   // Neon Cyan Web Glint
          dark: '#0E0914',        // Deep Dark Purple-Black Background
          darker: '#060309',
          card: '#180E22',        // Pink-Tinted Dark Card
          accent: '#FFC0CB'       // Soft Rose Gold / Pastel Pink
        }
      },
      fontFamily: {
        comic: ['Bangers', 'Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        handwritten: ['Caveat', 'Dancing Script', 'cursive']
      },
      boxShadow: {
        'spider-glow': '0 0 25px rgba(255, 42, 133, 0.6), 0 0 50px rgba(255, 42, 133, 0.3)',
        'blue-glow': '0 0 25px rgba(0, 229, 255, 0.6), 0 0 50px rgba(0, 229, 255, 0.3)',
        'comic': '6px 6px 0px #000000',
        'comic-red': '6px 6px 0px #FF2A85',
        'comic-blue': '6px 6px 0px #7B2CBF',
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
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(255,42,133,0.8))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(255,42,133,1))' },
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
