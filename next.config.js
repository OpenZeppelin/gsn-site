const path = require('path')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack (config, options) {
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    return config
  }
})