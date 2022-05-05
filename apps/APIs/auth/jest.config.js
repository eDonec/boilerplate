const defaultConfig = require("config/jest/jest-api");

module.exports = {
  ...defaultConfig,
  rootDir: "src",
  coverageDirectory: "../coverage",
  setupFilesAfterEnv: [
    ...defaultConfig.setupFilesAfterEnv,
    "<rootDir>/../jest.setup.js",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!mongodb-memory-server)"],
};
