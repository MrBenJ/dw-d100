const path = require('path');
const Dotenv = require('dotenv-webpack');
const ENV = (process.env.NODE_ENV || 'development').toLowerCase();

module.exports = {
  entry: path.resolve(__dirname, 'src/entry.tsx'),
  mode: ENV === 'staging' ? 'production' : ENV,
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    port: 9000,
    contentBase: './build',
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'ts-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new Dotenv()
  ]
};
