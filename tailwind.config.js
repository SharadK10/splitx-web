/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      animation: {
        'animation-bounce': 'bounce 1s infinite',
       }
       ,keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation' : 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation' : 'cubic-bezier(0, 0, 0.2, 1)',
          }
        }
       }
    },
  },
  plugins: [
    require('flowbite/plugin')({
    charts: true,
})],
}