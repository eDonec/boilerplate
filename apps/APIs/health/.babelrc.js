module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-typescript"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime",
    "source-map-support",
    [
      "module-resolver",
      {
        extensions: [".ts", ".tsx"],
        root: ["./src"],
      },
    ],
  ],
  sourceMaps: "inline",
  ignore: ["**/*.test.ts", "**/__test__/**"],
};
