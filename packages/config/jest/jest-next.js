module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverageFrom: ['<rootDir>/**/*.{js,ts,jsx,tsx}'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
    '^.+\\.jsx?$': 'esbuild-jest',
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^components/(.*)$': '<rootDir>/components/$1',
    '^pages/(.*)$': '<rootDir>/pages/$1',
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^constants/(.*)$': '<rootDir>/constants/$1',
    '^containers/(.*)$': '<rootDir>/containers/$1',
    '^_redux/(.*)$': '<rootDir>/_redux/$1',
    '^helpers/(.*)$': '<rootDir>/helpers/$1',
    '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
  },
};
