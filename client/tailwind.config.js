/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#050506',
        charcoal: '#101115',
        champagne: '#f4d690',
        violetGlow: '#a889ff',
        glacier: '#c7f1ff'
      },
      boxShadow: {
        luxury: '0 24px 80px rgba(0,0,0,.45)',
        glow: '0 0 60px rgba(244,214,144,.18)'
      }
    }
  },
  plugins: []
};
