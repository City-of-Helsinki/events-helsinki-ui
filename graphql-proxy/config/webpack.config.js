const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const getGraphqlProxyEnvironment = require("./env");
const paths = require("./paths");

// Get environment variables to inject into our app.
const env = getGraphqlProxyEnvironment();

module.exports = function() {
  return {
    entry: paths.appIndexJs,
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            }
          ]
        }
      ]
    },
    plugins: [new webpack.DefinePlugin(env.stringified)],
    node: {
      __dirname: false
    },
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, paths.appBuild)
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    target: "node"
  };
};
