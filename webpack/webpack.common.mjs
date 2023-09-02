import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import RemoveWebpackPlugin from 'remove-files-webpack-plugin';

// const __dirname = path.dirname( process.argv[1] );

const __dirname = './';

export default {
    entry: [ 'babel-polyfill', './src/app.mjs' ],
    plugins: [
        new HtmlWebpackPlugin({ 
            title: 'WebGPU Test Page',
            filename: 'index.html',
            template: './src/index.template',
            font: 'fonts/segoeuil.ttf'
        }),
        new RemoveWebpackPlugin({
            before: {
                log: false,
	        include: [ 'dist' ]
            }
        }),
        new CopyWebpackPlugin({ 
	    patterns: [
	        { from: path.resolve(__dirname, 'src', 'font'), to: path.resolve(__dirname, 'dist', 'font') },
	        { from: path.resolve(__dirname, 'src', 'js'), to: path.resolve(__dirname, 'dist', 'js') },
	        { from: path.resolve(__dirname, 'src', 'assets'), to: path.resolve(__dirname, 'dist', 'assets') },
	        { from: path.resolve(__dirname, 'src', 'config'), to: path.resolve(__dirname, 'dist', 'config') }
            ]
        }),

/*
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/fonts/segoeuil.ttf", to: "[path]fonts/segoeuil.ttf" },
        { from: "src/config/controller.bundle.js", to: "[path]config/controller.bundle.js" },
      ],
    }),
*/
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
        test: /\.(jsx|mjs)$/, 
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
