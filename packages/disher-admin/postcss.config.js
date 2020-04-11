const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.html'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => {
    const matches = content.match(/[\w-/:]+(?<!:)/g) || []
    return matches
  },
})

const plugins = [
  require('tailwindcss'),
  require('autoprefixer'),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(purgecss)
}

module.exports = {
  plugins
}
