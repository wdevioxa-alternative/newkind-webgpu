import {merge} from "webpack-merge";
import common from "./webpack.common.mjs";
import server from "./webpack.server.dev.mjs";

export default merge(common, server, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
});
