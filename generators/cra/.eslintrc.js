// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseEslintRc = require('../../.eslintrc');

module.exports = {
  ...baseEslintRc,
  rules: {
    ...baseEslintRc.rules,
    '@next/next/no-img-element': 'off',
  },
};
