/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  daisyui: {
    themes: ['light']
  },
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('daisyui')]
}
