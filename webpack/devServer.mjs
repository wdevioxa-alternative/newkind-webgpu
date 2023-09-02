import path from 'path';

const __dirname = './';

export default {
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 7355
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
