const path = require('path')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
const webpack = require('webpack')
const _ = require('lodash')

module.exports = withImages(withFonts(withCSS({
  webpack (config, options) {
    config.resolve.alias['assets'] = path.join(__dirname, 'assets')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['artifacts'] = path.join(__dirname, 'artifacts')

    config.plugins.push(new webpack.EnvironmentPlugin(
      _.pick(process.env, ['DEFAULT_ETHEREUM_NETWORK_NAME'])
    ))

    return config
  }
})))