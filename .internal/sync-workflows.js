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
      - ".github/workflows/*"
      - ".docker/Dockerfile.*"
      - "packages/**"
      - "package.json"
      - "compose/head/*"`;

const stagingChangeCondition = `    if: github.ref == 'refs/heads/master'`;

const headChangeTrigger = `  pull_request_review:
    types: [submitted]
    paths:
      - "apps/**"
      - ".github/workflows/*"
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
  const needs = `${apps
    .map((app) => `${app.packageName}-build-and-publish-${stage}`)
    .join(", ")}`;
  const deps = [];
  const jobs = apps
    .map((app) => {
      // ${{packageName}}-build-and-publish-${{stage}}
      const editedSegmetWorkFlow = segmentWorkFlow
        .replace(/\${{packageName}}/g, app.packageName)
        .replace(/\${{stage}}/g, stage)
        .replace(/\${{STAGE}}/g, stage.toUpperCase())
        .replace(/\${{changeTrigger}}/g, changeTrigger)
        .replace(/\${{changeCondition}}/g, changeCondition)
        .replace(/\${{deps}}/g, deps.join(", "));

      deps.push(
        `\${{packageName}}-deploy-to-\${{stage}}`
          .replace(/\${{packageName}}/g, app.packageName)
          .replace(/\${{stage}}/g, stage)
      );
      return editedSegmetWorkFlow;
    })
    .join("\n\n  ");
  const newWorkflow = baseWorkFlow
    .replace(/\${{needs}}/g, needs)
    .replace(/\${{jobs}}/g, jobs)
    .replace(/\${{stage}}/g, stage)
    .replace(/\${{STAGE}}/g, stage.toUpperCase())
    .replace(/\${{changeTrigger}}/g, changeTrigger)
    .replace(/\${{deps}}/g, deps.join(", "))
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
