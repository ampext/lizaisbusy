const config = require('./common.config');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
  entry: {
    'bundle': './src/index'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Liza is busy',
      template: path.join(__dirname, '../public/index.html'),
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8080'),
    }),
  ],
});