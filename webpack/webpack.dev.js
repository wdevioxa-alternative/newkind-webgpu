const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const server = require('./devServer.js');

module.exports = merge(common, server, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
});
