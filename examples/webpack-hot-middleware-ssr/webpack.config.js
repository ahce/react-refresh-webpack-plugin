const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    main: ['webpack-hot-middleware/client', './src/index.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-refresh/babel'],
          }
        }
      },
    ]
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshPlugin({ overlay: false }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
