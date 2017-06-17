const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: './code/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './code/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [htmlWebpackPluginConfig]
}
