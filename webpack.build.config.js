var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var postCssConfig = require('./postcss.config');

module.exports = {
  entry: [
    './src/entry.jsx',
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'build'),
    filename: 'build.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?minimize&module&importLoaders=1&localIdentName=[hash:base64:8]',
          {
            loader: 'postcss-loader',
            options: {
              plugins: postCssConfig
            }
          }
        ],
      }),
    },
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
      ignoreOrder: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new WebpackCleanupPlugin(),
  ]
};
