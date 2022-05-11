const path = require("path");
const defaultConfig = require("./jest-express");

module.exports = {
  ...defaultConfig,
  setupFilesAfterEnv: [
    ...defaultConfig.setupFilesAfterEnv,
    path.join(__dirname, "setup/jest-api.setup.js"),
  ],
};
