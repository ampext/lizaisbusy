const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'bundle': './src/index'
  },

  resolve: {
    modules: ['src', 'tests', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'App',
      template:  path.join(__dirname, 'public/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8080'),
    }),
  ],

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};