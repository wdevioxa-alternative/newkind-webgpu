const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', './src/app.js' ],
  plugins: [
    new HtmlWebpackPlugin({ 
        title: 'WebGPU Test Page',
        filename: 'index.html',
        template: './src/index.template'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js"
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx|mjs)$/, 
        exclude: /node_modules/,
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
