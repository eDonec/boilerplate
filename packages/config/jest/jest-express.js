module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'node',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.ts$': 'esbuild-jest-transform',
    '^.+\\.js$': 'esbuild-jest-transform',
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
};
