"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",

    docs: {
      description: "disallow express import from outside of custom package",
      category: "no-restricted-imports",
      recommended: true,
      url: "https://github.com/eDonec/boilerplate/readme-asstes/eslint-rules/no-import-express.md",
    },
    schema: [], // no options
  },
  create: function (context) {
    const sourceCode = context.getSourceCode();
    /**
     * Checks a node to see if any problems should be reported.
     * @param {import("eslint").Rule} node The node to check.
     * @returns {void}
     * @private
     */
    /** @type {import('eslint').Rule.NodeListener["ImportDeclaration"]} */
    function checkNode(node) {
      const importSource = node.source.value.trim();
      const importName = node.specifiers[0]?.local?.name;
      const filename = context.getFilename();
      const importNamed = node.specifiers[0]?.imported?.name;
      console.log({ filename, importName, importSource, importNamed });
      if (
        filename.includes("http-server") &&
        !filename.includes("APIs") &&
        !filename.includes(".ts")
      )
        return;
      if (importSource === "express") {
        context.report({
          node,
          message: `cannot import express directly use ${
            filename.includes("init.ts")
              ? "http-server local package"
              : "exported app or router from init"
          } instead`,
          data: { importName },
        });
      }
      if (
        !filename.includes("init.ts") &&
        importSource === "http-server" &&
        node.specifiers.findIndex(
          (spec) => spec.type === "ImportDefaultSpecifier"
        ) >= 0
      ) {
        context.report({
          node,
          message:
            "except for types, do not import directly from http-server use exported app or router from init instead",
          data: { importName },
        });
      }
    }

    return {
      ImportDeclaration: checkNode,
    };
  },
};
