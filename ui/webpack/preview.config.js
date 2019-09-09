const config = require('./common.config');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(config, {
  entry: {
    'preview_bundle': './src/preview'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Liza is busy [preview]',
      template: path.join(__dirname, '../public/preview.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../data'),
        to:  path.join(__dirname, '../dist'),
      } 
    ]),
  ]
});