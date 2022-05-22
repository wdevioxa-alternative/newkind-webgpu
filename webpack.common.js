const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [ 'babel-polyfill', './src/app.js' ],
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
      ],
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    chunkFilename: "[id].bundle.js",
    assetModuleFilename: "[path][name].[ext]"
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx|mjs)$/, 
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
