module.exports = {
  plugins: ["@typescript-eslint", "simple-import-sort", "unused-imports"],
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "dot-notation": "error",
    "@typescript-eslint/no-empty-function": "warn",
    "no-return-await": "warn",
    "no-unused-vars": "off",
    "newline-after-var": "warn",
    "newline-before-return": "warn",
    "max-lines": ["warn", 165],
    "no-var": "error",
    "no-console": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    //#region  //*=========== Unused Import ===========
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    //#endregion  //*======== Unused Import ===========

    //#region  //*=========== Import Sort ===========
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // React
          ["^react"],
          // ext library & side effect imports
          ["^@?\\w", "^\\u0000"],
          // Next
          ["^next"],
          // {s}css files
          ["^.+\\.s?css$"],
          // static data
          ["^data", "^constants"],
          // components
          ["^components", "^container"],
          // Lib and hooks
          ["^lib", "^hooks", "^helpers"],
          // zustand store
          ["^store", "^_redux"],
          // Other imports
          ["^"],
          // relative paths up until 3 level
          [
            "^\\./?$",
            "^\\.(?!/?$)",
            "^\\.\\./?$",
            "^\\.\\.(?!/?$)",
            "^\\.\\./\\.\\./?$",
            "^\\.\\./\\.\\.(?!/?$)",
            "^\\.\\./\\.\\./\\.\\./?$",
            "^\\.\\./\\.\\./\\.\\.(?!/?$)",
          ],
          ["^types"],
          // other that didnt fit in
          ["^"],
        ],
      },
    ],
    //#endregion  //*======== Import Sort ===========
  },
  overrides: [
    {
      env: {
        jest: true,
      },
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react", "plugin:jest/recommended"],
      rules: {
        "import/no-extraneous-dependencies": [
          "off",
          { devDependencies: ["**/?(*.)+(spec|test).[jt]s?(x)"] },
        ],
        "jest/no-mocks-import": "off",
      },
    },
  ],
  ignorePatterns: [
    "**/*.js",
    "**/*.json",
    "node_modules",
    "public",
    "styles",
    ".next",
    "coverage",
    "dist",
    ".turbo",
  ],
};
