/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const {
  packagesWithTestScripts,
  appsWithTestScript,
} = require("./getPackagesPath");
const dockerApps = [
  ...appsWithTestScript,
  {
    packageName: "proxy-balancer",
    packagePath: "proxy-balancer.conf",
    isApp: false,
  },
].filter((app) => app.packageName !== "e2e");

const syncWorkflowsFromBase = (basePath, packages, workflowType) => {
  const baseWorkflows = fs
    .readFileSync(path.join(__dirname, basePath))
    .toString();
  packages.forEach((package) => {
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
syncWorkflowsFromBase("../.github/base.build.yml", dockerApps, "build");

const syncBuildAndTestDocker = (basePath, segmentPath, apps) => {
  const baseWorkFlow = fs
    .readFileSync(path.join(__dirname, basePath))
    .toString();
  const segmentWorkFlow = fs
    .readFileSync(path.join(__dirname, segmentPath))
    .toString();
  const needs = `[${apps
    .map((app) => `${app.packageName}-deploy-to-head`)
    .join(", ")}]`;
  const jobs = apps
    .map((app) =>
      segmentWorkFlow.replace(/\${{packageName}}/g, app.packageName)
    )
    .join("\n\n  ");
  const newWorkflow = baseWorkFlow
    .replace(/\${{needs}}/g, needs)
    .replace(/\${{jobs}}/g, jobs);
  fs.writeFileSync(
    path.join(__dirname, "../.github/workflows/build-images-on-approve.yml"),
    newWorkflow
  );
};

syncBuildAndTestDocker(
  "../.github/head.build.yml",
  "../.github/head.segment.build.yml",
  dockerApps
);
