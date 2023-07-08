// import konstaConfig config
const konstaConfig = require('konsta/config');

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'media', // or 'class'
  theme: {
    fontFamily: {
      ios: 'Karla',
      material: 'Karla',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
