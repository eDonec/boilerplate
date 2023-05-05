/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const {
  packagesWithTestScripts,
  appsWithTestScript,
} = require("./getPackagesPath");
const { getTriggerConditions } = require("./lib");

const triggerConditionRegex = /{{triggerCondition}}/g;

const syncWorkflowsFromBase = (basePath, packages, workflowType) => {
  const baseWorkflows = fs
    .readFileSync(path.join(__dirname, basePath))
    .toString();
  packages
    .filter((p) => p.packageName !== "client")
    .forEach((package) => {
      const workflowFile = `../.github/workflows/${package.packageName}-${workflowType}.yml`;
      const dependencies = getTriggerConditions(package.packagePath);
      const newWorkflow = baseWorkflows
        .replace(/\${{packageName}}/g, package.packageName)
        .replace(/\${{isPackage}}/g, package.isApp ? "" : "#")
        .replace(triggerConditionRegex, dependencies);

      fs.writeFileSync(path.join(__dirname, workflowFile), newWorkflow);
    });
};

// Sync workflows for testing when PR is opened
syncWorkflowsFromBase(
  "../.github/base.test.yml",
  [...packagesWithTestScripts, ...appsWithTestScript],
  "test"
);

require("./make-build-workflows");
