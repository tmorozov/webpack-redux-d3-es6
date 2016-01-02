/*globals module */

module.exports = {
  entry: "./src/js/app.es6",
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
    loaders: [
      {
        test: /\.es6?$/,
        exclude: /(node_modules)/,
        loader: "babel"
      }
    ]
  },
  devtool: 'source-map'
};