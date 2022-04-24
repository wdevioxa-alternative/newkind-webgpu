const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', './src/app.mjs' ],
  plugins: [
    new HtmlWebpackPlugin({ 
        title: 'NewKind Graph',
        filename: 'index.html',
        template: './src/index.html'
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.mjs",
    chunkFilename: "[id].bundle.mjs"
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
