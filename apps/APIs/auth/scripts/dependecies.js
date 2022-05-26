const path = require("path");

const localPackageJson = require("../package.json");
const {
  extractInternalPackagesFromPackageJson,
  resolveMultipleInternalPackageDirs,
  getAllPackageJsonDepsRecursive,
} = require("./lib");

const internalImportedPackageNames =
  extractInternalPackagesFromPackageJson(localPackageJson);
const internalPackageDirs = resolveMultipleInternalPackageDirs(
  internalImportedPackageNames
);

const allDependecyTreeDirs =
  getAllPackageJsonDepsRecursive(internalPackageDirs);

console.log({
  internalImportedPackageNames,
  internalPackageDirs,
  allDependecyTreeDirs,
});

// const resolvePackageName =
const modules = [];
const packages = [];
packages.push(
  ...modules.map((module) => path.join(__dirname, "../../packages", module))
);

module.exports = [];
