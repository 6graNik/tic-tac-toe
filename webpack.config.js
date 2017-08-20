var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var loaders = require('./webpack.loaders');
var config = require('./src/configs/main');

var PATH_BUILD = path.join(__dirname, 'build');
var NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: [
    './src/entry.jsx',
  ],
  devtool: config.WEBPACK_DEVTOOL,
  output: {
    publicPath: '/',
    path: PATH_BUILD,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    loaders: loaders,
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    inline: true,
    port: config.PORT,
    host: config.HOST,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
