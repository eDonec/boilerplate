module.exports = {
  ...require('config/jest/jest-cra'),
  rootDir: '.',
  collectCoverageFrom: ['!(coverage)/*.{js,ts,jsx,tsx}'],
};
