module.exports = {
  ...require("./jest-common"),
  testEnvironment: "node",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  collectCoverageFrom: ["<rootDir>/**/*.{js,ts}"],
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.ts$": "esbuild-jest",
    "^.+\\.js$": "esbuild-jest",
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
  moduleDirectories: ["node_modules", "<rootDir>"],
};
