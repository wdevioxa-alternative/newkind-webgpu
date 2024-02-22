import path from 'path';
import express from 'express';

const __dirname = './';

export default {
  devServer: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin"
    },
    hot: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 7356,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use('/docs/', express.static(path.resolve(__dirname, 'dist/docs')));
      return middlewares;
    }
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
