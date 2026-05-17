/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        // Core palette
        void: '#030303',
        carbon: '#0a0a0a',
        obsidian: '#111111',
        graphite: '#1a1a1a',
        steel: '#2a2a2a',
        silver: '#8a8a8a',
        pearl: '#d4d4d4',
        white: '#f5f5f5',
        // Neon accents
        neon: {
          cyan: '#00f5ff',
          blue: '#0066ff',
          violet: '#8b00ff',
          green: '#00ff88',
          pink: '#ff0080',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(0, 245, 255, 0.8)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '20%': { transform: 'translate(3%, 1%)' },
          '30%': { transform: 'translate(-1%, 3%)' },
          '40%': { transform: 'translate(2%, -1%)' },
          '50%': { transform: 'translate(-3%, 2%)' },
          '60%': { transform: 'translate(1%, -3%)' },
          '70%': { transform: 'translate(-2%, 1%)' },
          '80%': { transform: 'translate(3%, -2%)' },
          '90%': { transform: 'translate(-1%, 3%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
