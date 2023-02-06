const path = require("path");

module.exports = {
  ...require("./jest-common"),
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom",
    path.join(__dirname, "setup/jest-jsx-transform.config.js"),
  ],
  collectCoverageFrom: ["**/src/**/*.{js,ts,jsx,tsx}"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "esbuild-jest",
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
  moduleNameMapper: {
    "^axios$": "axios/dist/axios.js",
  },
};
