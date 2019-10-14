const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/template.html`,
    }),
  ],
};
