const path = require("path");

// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
  entry: "./source/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

module.exports = (env, argv) => {
  config.mode = argv.mode;

  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
  }

  return config;
};
