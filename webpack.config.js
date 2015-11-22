var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './ui/js/main'
  ],
  output: {
    path: path.join(__dirname, 'public/js/'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    },
    {
      test: /\.scss$/, 
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('../css/bundle.css', {
      allChunks: true
    })
  ]
};
