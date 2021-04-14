const autoprefixer = require('autoprefixer')
const assets = require('postcss-assets')

module.exports = {
  plugins: [
    assets({
      cache: true,
    }),
    autoprefixer(),
  ],
}
