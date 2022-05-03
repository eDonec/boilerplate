/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const {
  packagesWithTestScripts,
  appsWithTestScript,
} = require("./getPackagesPath");

const syncWorkflowsFromBase = (basePath, packages, workflowType) => {
  const baseWorkflows = fs
    .readFileSync(path.join(__dirname, basePath))
    .toString();
  packages.forEach((package) => {
    console.log(package);
    const workflowFile = `../.github/workflows/${package.packageName}-${workflowType}.yml`;

    const newWorkflow = baseWorkflows
      .replace(/\${{packageName}}/g, package.packageName)
      .replace(/\${{packagePath}}/g, package.packagePath)
      .replace(/\${{isPackage}}/g, package.isApp ? "" : "#");
    fs.writeFileSync(path.join(__dirname, workflowFile), newWorkflow);
  });
};

// Sync workflows for testing when PR is opened
syncWorkflowsFromBase(
  "../.github/base.test.yml",
  [...packagesWithTestScripts, ...appsWithTestScript],
  "test"
);
syncWorkflowsFromBase(
  "../.github/base.build.yml",
  [
    ...appsWithTestScript,
    {
      packageName: "proxy-balancer",
      packagePath: "proxy-balancer.conf",
      isApp: false,
    },
  ],
  "build"
);
