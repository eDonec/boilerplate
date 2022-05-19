/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const {
  packagesWithTestScripts,
  appsWithTestScript,
} = require("./getPackagesPath");
const dockerApps = [
  {
    packageName: "proxy-balancer",
    packagePath: "proxy-balancer.conf",
    isApp: false,
  },
  ...appsWithTestScript,
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
// syncWorkflowsFromBase("../.github/base.build.yml", dockerApps, "build");

const stagingChangeTrigger = `  push:
    branches: [master]
    paths:
      - "apps/**"
      - ".docker/Dockerfile.*"
      - "packages/**"
      - "package.json"
      - "compose/head/*"`;

const stagingChangeCondition = `    if: github.ref == 'refs/heads/master'`;

const headChangeTrigger = `  pull_request_review:
    types: [submitted]
    paths:
      - "apps/**"
      - ".docker/Dockerfile.*"
      - "packages/**"
      - "package.json"
      - "compose/head/*"`;

const headChangeCondition = `    if: (github.ref != 'refs/heads/master') && (github.ref != 'refs/heads/develop') && (github.event.review.state == 'approved')`;

const syncBuildAndTestDocker = (
  basePath,
  segmentPath,
  outputPath,
  apps,
  stage,
  changeTrigger,
  changeCondition
) => {
  const baseWorkFlow = fs
    .readFileSync(path.join(__dirname, basePath))
    .toString();
  const segmentWorkFlow = fs
    .readFileSync(path.join(__dirname, segmentPath))
    .toString();
  const needs = `[${apps
    .map((app) => `${app.packageName}-deploy-to-${stage}`)
    .join(", ")}]`;
  const deps = [];
  const jobs = apps
    .map((app) => {
      deps.push(
        `\${{packageName}}-build-and-publish-\${{stage}}`
          .replace(/\${{packageName}}/g, app.packageName)
          .replace(/\${{stage}}/g, stage)
      );
      // ${{packageName}}-build-and-publish-${{stage}}
      return segmentWorkFlow
        .replace(/\${{packageName}}/g, app.packageName)
        .replace(/\${{stage}}/g, stage)
        .replace(/\${{STAGE}}/g, stage.toUpperCase())
        .replace(/\${{changeTrigger}}/g, changeTrigger)
        .replace(/\${{changeCondition}}/g, changeCondition)
        .replace(/\${{deps}}/g, deps.join(", "));
    })
    .join("\n\n  ");
  const newWorkflow = baseWorkFlow
    .replace(/\${{needs}}/g, needs)
    .replace(/\${{jobs}}/g, jobs)
    .replace(/\${{stage}}/g, stage)
    .replace(/\${{STAGE}}/g, stage.toUpperCase())
    .replace(/\${{changeTrigger}}/g, changeTrigger)
    .replace(/\${{changeCondition}}/g, changeCondition);
  fs.writeFileSync(path.join(__dirname, outputPath), newWorkflow);
};

syncBuildAndTestDocker(
  "../.github/head.build.yml",
  "../.github/head.segment.build.yml",
  "../.github/workflows/build-images-on-approve.yml",
  dockerApps,
  "head",
  headChangeTrigger,
  headChangeCondition
);

syncBuildAndTestDocker(
  "../.github/head.build.yml",
  "../.github/head.segment.build.yml",
  "../.github/workflows/build-images-on-merge-to-master.yml",
  dockerApps,
  "staging",
  stagingChangeTrigger,
  stagingChangeCondition
);
