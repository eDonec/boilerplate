const fs = require("fs");
const path = require("path");
const rootDir = path.resolve(__dirname, "../");
const { getTriggerConditions } = require("./lib");
const { appsWithTestScript } = require("./getPackagesPath");
const imageApps = appsWithTestScript.filter((app) => app.packageName !== "e2e");

const basePath = "./.github/build.image.yml";

const baseFile = fs.readFileSync(path.join(rootDir, basePath)).toString();

const microserviceNameRegex = /{{microserviceName}}/g;
const triggerConditionRegex = /{{triggerCondition}}/g;
const branchNameRegex = /{{branchName}}/g;
const dockerFileRegex = /{{dockerfile}}/g;

const imageAppsWithDependencies = imageApps.map((app) => ({
  ...app,
  dependencies: getTriggerConditions(app.packagePath),
}));

const createBuildImageWorkflow = (app) => {
  const workflowFile = `../.github/workflows/build-${app.packageName}-image.yml`;
  const newWorkflow = baseFile
    .replace(microserviceNameRegex, app.packageName)
    .replace(triggerConditionRegex, app.dependencies)
    .replace(branchNameRegex, "master")
    .replace(dockerFileRegex, app.Dockerfile);
  fs.writeFileSync(path.join(__dirname, workflowFile), newWorkflow);
  return newWorkflow;
};

imageAppsWithDependencies
  .filter((p) => p.packageName !== "client")
  .forEach((image) => createBuildImageWorkflow(image));
