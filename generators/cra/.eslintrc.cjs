/* eslint-disable global-require */
module.exports = {
  ...require("config/eslint/eslint-cra.js"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
