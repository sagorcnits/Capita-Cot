/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "*.html"],
  theme: {

screens:{
'md':'1000px'
},


    extend: {

'colors': {
  bgHover:"#D1EBFF",
  textColor:"#1B9CFC"
}


    },
  },
  plugins: [],
}

