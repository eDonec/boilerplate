module.exports = {
  ...require("config/jest/jest-express"),
  rootDir: ".",
  collectCoverageFrom: ["!(coverage)/*.{js,ts,jsx,tsx}"],
};
