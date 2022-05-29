/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const packages = require("./scripts/getInternalDependencyDirs");

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
