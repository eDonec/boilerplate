module.exports = {
  ...require("./eslint-common"),
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
};
