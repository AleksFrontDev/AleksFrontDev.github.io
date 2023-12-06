"use strict";

let path = require("path");

module.exports = {
  mode: "production",
  entry: [
    path.resolve(__dirname, "src", "js", "script.js"),
    path.resolve(__dirname, "src", "js", "modules", "hamburger.js"),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js"), 
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
