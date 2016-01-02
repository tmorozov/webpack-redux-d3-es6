/*globals module */

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: "./dist",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    inline: true,
    contentBase: "./dist"
  },
  module: {
    postLoaders: [
        {
            test: /d3-geo-projection/,
            loader: "transform?brfs"
        }
    ],
    loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loaders: [
                "babel"
            ]
        }
    ]
  },
  devtool: 'source-map'
};