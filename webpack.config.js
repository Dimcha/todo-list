var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.resolve(__dirname, "assets/js/app")
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'jsx',
      query: {
        presets: ['react']
      }
    }]
  }
};
