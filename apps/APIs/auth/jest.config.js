const defaultConfig = require("config/jest/jest-api");

module.exports = {
  ...defaultConfig,
  rootDir: "src",
  coverageDirectory: "../coverage",
  setupFilesAfterEnv: [
    ...defaultConfig.setupFilesAfterEnv,
    "<rootDir>/__test__/setupFile.ts",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!mongodb-memory-server)"],
  globalSetup: "<rootDir>/__test__/globalSetup.ts",
  globalTeardown: "<rootDir>/__test__/globalTeardown.ts",
};
