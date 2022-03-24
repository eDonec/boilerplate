module.exports = {
  ...require("./eslint-common"),
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...require("./eslint-common").rules,
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never" },
    ],
    "react/display-name": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "spaced-comment": "off",
    "react/prop-types": "off",
    "consistent-return": "off",
  },
  globals: {
    React: true,
    JSX: true,
  },
};
