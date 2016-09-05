const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');

const parts = require('./libs/parts');

var TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};

var config;

switch (TARGET) {
  case 'build':
    config = merge(common, {});
  default:
    config = merge(
      common,
      parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);

