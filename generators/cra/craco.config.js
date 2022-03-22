/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const modules = ['core-hooks', 'core-ui', 'core-utils'];
const packages = [];

packages.push(
  ...modules.map((module) => path.join(__dirname, '../../packages', module))
);

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader')
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
