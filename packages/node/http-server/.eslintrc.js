const serverConfig = require("config/eslint/eslint-server");

module.exports = {
  ...serverConfig,
  rules: {
    ...serverConfig.rules,
    "es-local-rules/no-import-express": "off",
  },
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
