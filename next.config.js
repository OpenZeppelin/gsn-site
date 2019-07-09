const path = require('path')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')

module.exports = withFonts(withCSS({
  webpack (config, options) {
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    return config
  }
}))