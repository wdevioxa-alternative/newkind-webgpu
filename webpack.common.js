<<<<<<< HEAD:webpack/webpack.common.mjs
import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __dirname = path.dirname( process.argv[1] );

export default {
  entry: [ 'babel-polyfill', './src/app.mjs' ],
=======
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', './src/app.js' ],
>>>>>>> 29577e5ccd729d9da53741f518421286c87debe1:webpack.common.js
  plugins: [
    new HtmlWebpackPlugin({ 
        title: 'WebGPU Test Page',
        filename: 'index.html',
        template: './src/index.template',
        font: 'fonts/segoeuil.ttf'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/fonts/segoeuil.ttf", to: "[path]fonts/segoeuil.ttf" },
<<<<<<< HEAD:webpack/webpack.common.mjs
        { from: "src/config/controller.bundle.js", to: "[path]config/controller.bundle.js" },
=======
>>>>>>> 29577e5ccd729d9da53741f518421286c87debe1:webpack.common.js
      ],
    }),
  ],
  output: {
<<<<<<< HEAD:webpack/webpack.common.mjs
    path: path.resolve(__dirname, '../../../dist'),
=======
    path: path.resolve(__dirname, 'dist'),
>>>>>>> 29577e5ccd729d9da53741f518421286c87debe1:webpack.common.js
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    assetModuleFilename: "[path][name].[ext]"
  },
  module: {
    rules: [
      { 
<<<<<<< HEAD:webpack/webpack.common.mjs
        test: /\.(jsx|mjs)$/, 
=======
        test: /\.(js|jsx|mjs)$/, 
>>>>>>> 29577e5ccd729d9da53741f518421286c87debe1:webpack.common.js
        exclude: /\.(node_modules|js)$/,
	      use: { 
		      loader: 'babel-loader',  
		      options: {
			      presets: ['@babel/preset-env']
                      } 
	      },
      },
      { 
        test: /\.wgsl/,
        type: 'asset/source' 
      },
      { 
	test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
	generator: {
		filename: '[path][name].[ext]'
	}
      }
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  mode: 'production'
};
