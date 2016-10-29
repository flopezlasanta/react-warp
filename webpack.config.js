var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './js');
var APP_DIR = path.resolve(__dirname, './app');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: "/js/"   
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  devServer : {
    port: 9001
  }
}
