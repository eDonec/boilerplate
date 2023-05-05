/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { getLoader, loaderByName } = require("@craco/craco");
const packages = require("./scripts/getInternalDependencyDirs");

/** @type {import('@craco/craco').CracoConfig} */
module.exports = {
  eslint: {
    enable: false,
  },
  jest: {
    configure: {
      ...require("config/jest/jest-cra"),
      moduleNameMapper: {
        "^axios$": "axios/dist/axios.js",
        "\\.(css|less|sass)$": "config/jest/__mocks__/styleMock.js",
      },
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
