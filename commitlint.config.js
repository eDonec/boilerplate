module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: { "subject-case": [0], "header-max-length": [0, "always", 120] },
};
