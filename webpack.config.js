// @ts-check
const path = require("path");

// Webpack plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");

/**
 * Html-head options
 * @type { HtmlWebpackPlugin.Options }
 */
const htmlOptions = {
  title: "Pixel Schedule",
  meta: {
    description: "An interactive SintLucas pixel schedule.",
    "og:title": { property: "og:title", content: "Pixel Schedule" },
    "og:type": { property: "og:type", content: "website" },
    "og:url": {
      property: "og:url",
      content: "https://bodhivb.github.io/pixel-schedule",
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
};

/**
 * Default config
 * @type { import('webpack').Configuration }
 */
const config = {
  entry: "./source/index.ts",
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  module: { rules: [{ test: /\.tsx?$/, use: "ts-loader" }] },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: "assets/", to: "assets/" }] }),
    new HtmlWebpackPlugin(htmlOptions),
    new HtmlWebpackTagsPlugin({
      tags: ["assets/css/base.css", "assets/css/elements.css"],
    }),
  ],
  // Web games are bigger than pages, disable the warnings that our game is too big.
  performance: { hints: false },
  output: { filename: "main.js", path: path.resolve(__dirname, "dist") },
};

/**
 * Export config
 * @param {any} env
 * @param {any} argv
 */
module.exports = (env, argv) => {
  config.mode = argv.mode;

  if (argv.mode === "development") {
    // Development config
    config.devtool = "eval-source-map";
  } else if (argv.mode === "production") {
    // Production config
  }

  return config;
};
