// // Generated using webpack-cli https://github.com/webpack/webpack-cli

// const path = require("path");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// const modules = [
//   "node/field-validator",
//   // "node/core-utils",
//   // "node/shared-types",
//   // "node/api-types/auth-types",
//   // "node/shared-types",
//   // "node/custom-error",
// ];
// const packages = [];
// packages.push(...modules.map((m) => path.join(__dirname, "../../packages", m)));
// const isProduction = process.env.NODE_ENV == "production";

// /** @type {import('webpack').Configuration} */
// const config = {
//   target: "node",
//   mode: "production",
//   entry: "./src/index.ts",
//   output: {
//     path: path.resolve(__dirname, "build"),
//   },
//   resolve: {
//     extensions: [".ts", ".tsx", ".js", ".json"],
//   },
//   plugins: [new ForkTsCheckerWebpackPlugin()],
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/i,
//         exclude: ["/node_modules/"],
//         include: [],
//         use: {
//           options: {
//             presets: ["@babel/preset-env", "@babel/preset-typescript"],
//             plugins: [
//               "@babel/plugin-proposal-class-properties",
//               "@babel/plugin-transform-runtime",
//               "source-map-support",
//               [
//                 "module-resolver",
//                 {
//                   extensions: [".ts", ".tsx"],
//                   root: ["./src"],
//                 },
//               ],
//             ],
//             sourceMaps: "inline",
//             ignore: ["**/*.test.ts", "**/__test__/**"],
//           },
//           loader: "babel-loader",
//         },
//       },

//       // Add your rules for custom modules here
//       // Learn more about loaders from https://webpack.js.org/loaders/
//     ],
//   },
//   stats: "detailed",
// };

// module.exports = () => {
//   if (isProduction) {
//     config.mode = "production";
//   } else {
//     config.mode = "development";
//   }
//   return config;
// };

const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, "src"),
  target: "node",
  bail: true,
  devtool: false,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src"),
    ],
    extensions: [
      ".web.mjs",
      ".mjs",
      ".web.js",
      ".js",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".json",
      ".web.jsx",
      ".jsx",
    ],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: [],
            // loader: "babel-loader",
            exclude: [/node_modules/],
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime",
                "source-map-support",
                [
                  "module-resolver",
                  {
                    extensions: [".ts", ".tsx"],
                    root: ["./src"],
                  },
                ],
              ],
              sourceMaps: "inline",
              ignore: ["**/*.test.ts", "**/__test__/**", "**/node_modules/**"],
            },
          },
        ],
      },
    ],
  },
  stats: "detailed",

  plugins: [new ForkTsCheckerWebpackPlugin()],
};
