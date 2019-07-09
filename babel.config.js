module.exports = function (api) {
  api.cache(true)

  const presets = [
    "next/babel"
  ]

  const plugins = [
    [
      "babel-plugin-root-import"
    ]
  ]

  return {
    plugins,
    presets
  }
}

