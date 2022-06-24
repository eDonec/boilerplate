module.exports = {
  ...require("config/eslint/eslint-server"),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
