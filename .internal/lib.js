const path = require("path");
const fs = require("fs");
const rootDir = path.resolve(__dirname, "../");
const workspaces = require(path.resolve(
  rootDir,
  "package.json"
)).workspaces.map((workspace) => workspace.replace(/\*/g, ""));
const extractInternalPackagesFromPackageJson = (packageJson) =>
  packageJson.dependencies
    ? Object.keys(packageJson.dependencies)
        .map((key) => ({
          moduleName: key,
          path: packageJson.dependencies[key],
        }))
        .filter((dep) => dep.path === "*")
        .map((dep) => dep.moduleName)
    : [];

const resolveInternalPackageDir = (internalPackageName) => {
  let correctDir = null;
  for (let index = 0; index < workspaces.length; index++) {
    const workspace = workspaces[index];

    try {
      fs.readdirSync(path.join(rootDir, workspace, internalPackageName));
      correctDir = path.join(rootDir, workspace, internalPackageName);
      index = workspaces.length;
    } catch (error) {
      continue;
    }
  }
  if (correctDir === null) {
    throw new Error(`Could not find ${internalPackageName} in workspaces`);
  }
  return correctDir;
};

const resolveMultipleInternalPackageDirs = (
  internalPackageNames,
  workspaces
) => {
  const resolvedDirs = [];
  for (let index = 0; index < internalPackageNames.length; index++) {
    const internalPackageName = internalPackageNames[index];
    const resolvedDir = resolveInternalPackageDir(
      internalPackageName,
      workspaces
    );
    resolvedDirs.push(resolvedDir);
  }
  return resolvedDirs;
};

const getPackageJsonDeps = (packagePath) => {
  const packageJson = require(path.join(packagePath, "package.json"));
  return extractInternalPackagesFromPackageJson(packageJson);
};

const getPackageJsonDepsRecursive = (
  packagePath,
  resolvedPaths = [packagePath]
) => {
  const currentDeps = getPackageJsonDeps(packagePath);
  const currentDepsPaths = resolveMultipleInternalPackageDirs(
    currentDeps,
    workspaces
  );
  if (currentDepsPaths.length === 0) {
    return resolvedPaths;
  }
  const unresolvedDepth = currentDepsPaths.filter(
    (p) => !resolvedPaths.includes(p)
  );
  if (unresolvedDepth.length === 0) {
    return resolvedPaths;
  }
  return unresolvedDepth
    .reduce((acc, curr) => {
      acc.push(curr);
      const newResPaths = getPackageJsonDepsRecursive(curr, acc);
      // console.log({ newResPaths });
      acc.push(newResPaths.filter((p) => !acc.includes(p)));
      return acc;
    }, resolvedPaths || [])
    .filter((e) => !Array.isArray(e));
};

const getAllPackageJsonDepsRecursive = (packagePaths) => {
  let newResolvedPaths = [...packagePaths];
  packagePaths.forEach((p) => {
    const res = getPackageJsonDepsRecursive(p, [...newResolvedPaths]);
    newResolvedPaths = [...res];
  });
  return newResolvedPaths;
};
const getPackageNameFromPath = (packagePath) => {
  return require(path.resolve(packagePath, "package.json")).name;
};
const getRelativePathFromPath = (path) => {
  const relativePath = path.replace(rootDir, "");
  return relativePath.replace(/\\/g, "/").replace("/", "") + "/**";
};

const getTriggerConditions = (imageRelativePath) => {
  const localPackageJson = require(path.join(
    rootDir,
    imageRelativePath.replace("**", ""),
    "package.json"
  ));

  const internalImportedPackageNames =
    extractInternalPackagesFromPackageJson(localPackageJson);
  const internalPackageDirs = resolveMultipleInternalPackageDirs(
    internalImportedPackageNames
  );

  const allDependecyTreeDirs =
    getAllPackageJsonDepsRecursive(internalPackageDirs);

  const relativePaths = allDependecyTreeDirs.map(getRelativePathFromPath);
  relativePaths.unshift(imageRelativePath);
  const relativePathSet = new Set(relativePaths);
  const relativePathString = Array.from(relativePathSet)
    .filter((o) => !o.includes("shared-types"))
    .map((o) => `      - "${o}"`)
    .join("\n");

  return relativePathString;
};

module.exports = {
  extractInternalPackagesFromPackageJson,
  resolveMultipleInternalPackageDirs,
  getAllPackageJsonDepsRecursive,
  getPackageNameFromPath,
  getRelativePathFromPath,
  getTriggerConditions,
};
