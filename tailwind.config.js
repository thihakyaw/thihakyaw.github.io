/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0d0d0d',
          text: '#d4d4d4',
          green: '#00ff41',
          amber: '#fbbf24',
          border: '#2a2a2a',
          muted: '#6b7280',
        },
        paper: {
          bg: '#f5f0e8',
          text: '#1a1a1a',
          green: '#2d7a2d',
          amber: '#92400e',
          border: '#c5bfb0',
          muted: '#6b7280',
        },
      },
    },
  },
  plugins: [],
}
