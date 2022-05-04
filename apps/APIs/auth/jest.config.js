module.exports = {
  ...require("config/jest/jest-express"),
  rootDir: "src",
  coverageDirectory: "../coverage",
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!mongodb-memory-server)"],
};
