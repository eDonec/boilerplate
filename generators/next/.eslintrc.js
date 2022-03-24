module.exports = {
  ...require("config/eslint/eslint-next.js"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
