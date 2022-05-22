import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __dirname = path.dirname(process.argv[1]);

export default {
  entry: [ 'babel-polyfill', './src/app.mjs' ],
  plugins: [
    new HtmlWebpackPlugin({ 
        title: 'WebGPU Test Page',
        filename: 'index.html',
        template: './src/index.template',
        font: 'fonts/segoeuil.ttf'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/fonts/segoeuil.ttf", to: "[path]fonts/segoeuil.ttf" },
      ],
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
