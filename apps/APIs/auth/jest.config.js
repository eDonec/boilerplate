const defaultConfig = require("config/jest/jest-express");

module.exports = {
  ...defaultConfig,
  rootDir: "src",
  coverageDirectory: "../coverage",
  setupFilesAfterEnv: [
    ...defaultConfig.setupFilesAfterEnv,
    "<rootDir>/../jest.setup.js",
  ],
  globalSetup: "<rootDir>/../jest.global-setup.config.js",
  globalTeardown: "<rootDir>/../jest.global-teardown.config.js",
};
