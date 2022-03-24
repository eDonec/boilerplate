module.exports = {
  ...require("./eslint-common"),
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  globals: {
    React: true,
    JSX: true,
  },

  rules: {
    ...require("./eslint-common").rules,
    "react/display-name": "off",
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never" },
    ],
  },
};
