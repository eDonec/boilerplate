module.exports = {
  ...require("./eslint-common.js"),
  extends: ["@react-native-community"],
  rules: {
    ...require("./eslint-common.js").rules,
    "no-param-reassign": "off",
    "no-plusplus": "off",
    quotes: "off",
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "never", children: "never" },
    ],
  },
  globals: {
    React: true,
    JSX: true,
  },
};
