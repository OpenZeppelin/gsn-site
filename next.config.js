const path = require('path')

module.exports = {
  webpack (config, options) {
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    return config
  }
}