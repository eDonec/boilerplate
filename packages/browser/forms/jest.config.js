module.exports = {
  ...require("config/jest/jest-cra"),
  rootDir: ".",
  collectCoverageFrom: ["!(coverage)/*.{js,ts,jsx,tsx}"],
  moduleNameMapper: {
    "\\.svg$": "forms/__mocks__/styleMock.ts",
  },
};
