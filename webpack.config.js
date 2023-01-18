const path = require("path");

// Plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

// Default config
var config = {
  entry: "./source/index.ts",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader" }],
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: "assets/", to: "assets/" }] }),
    new HtmlWebpackPlugin({
      title: "Pixel Schedule",
      meta: {
        description: "An interactive SintLucas pixel schedule.",
        "og:title": { property: "og:title", content: "Pixel Schedule" },
        "og:type": { property: "og:type", content: "website" },
        "og:url": {
          property: "og:url",
          content: "https://bodhivb.github.io/pixel-schedule/",
        },
        "og:image": {
          property: "og:image",
          content:
            "https://bodhivb.github.io/pixel-schedule/assets/outdoors/tree.png",
        },
        "og:description": {
          property: "og:description",
          content: "An interactive SintLucas pixel schedule.",
        },
      },
    }),
    new HtmlWebpackTagsPlugin({
      tags: ["assets/css/base.css", "assets/css/elements.css"],
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};

//Export config
module.exports = (env, argv) => {
  config.mode = argv.mode;

  if (argv.mode === "development") {
    // Development config
    config.devtool = "inline-source-map";
  } else if (argv.mode === "production") {
    // Production config
  }

  return config;
};
