/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");

const modules = [
  "browser/core-hooks",
  "browser/core-ui",
  "browser/forms",
  "node/field-validator",
  "node/core-utils",
  "SDK/node/auth-sdk",
  "SDK/node/server-sdk",
];
const packages = [];
packages.push(
  ...modules.map((module) => path.join(__dirname, "../../packages", module))
);
/** @type {import('@craco/craco').CracoConfig} */
module.exports = {
  jest: {
    configure: {
      ...require("config/jest/jest-cra"),
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader")
      );

      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      return webpackConfig;
    },
  },
};
