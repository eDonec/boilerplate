module.exports = {
  ...require('config/eslint/eslint-next.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    ...require('config/eslint/eslint-next.js').rules,
    '@next/next/no-html-link-for-pages': 'off',
  },
};
