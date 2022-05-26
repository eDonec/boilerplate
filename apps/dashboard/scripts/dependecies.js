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

module.exports = allDependecyTreeDirs;
