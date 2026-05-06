/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F14',
        card: '#131A22',
        accent: '#00FF9D',
        warning: '#FFB020',
        danger: '#FF4D4D',
        text: '#F5F7FA',
        muted: '#6B7280'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(0, 255, 157, 0.2)' },
          '50%': { opacity: .5, boxShadow: '0 0 25px rgba(0, 255, 157, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
