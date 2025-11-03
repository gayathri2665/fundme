/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFF4EE',
        'primary-accent': '#E8A0A4',
        'secondary-accent': '#C66B7D',
        'highlight-button': '#F6D3C3',
        'text-primary': '#3D2C2E',
        'text-secondary': '#6E4F52',
        'decorative-dark-accent': '#8A2C34',
      },
    },
  },
  plugins: [],
};
