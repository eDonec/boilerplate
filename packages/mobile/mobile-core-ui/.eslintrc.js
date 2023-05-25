module.exports = {
  ...require("config/eslint/eslint-rn"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    root: true,
  },
};
