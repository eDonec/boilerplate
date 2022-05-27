const path = require("path");
const localPackageJson = require("../package.json");
const {
  extractInternalPackagesFromPackageJson,
  resolveMultipleInternalPackageDirs,
  getAllPackageJsonDepsRecursive,
  getPackageNameFromPath,
} = require("./lib");

const fs = require("fs");

const internalImportedPackageNames =
  extractInternalPackagesFromPackageJson(localPackageJson);
const internalPackageDirs = resolveMultipleInternalPackageDirs(
  internalImportedPackageNames
);

const allDependecyTreeDirs =
  getAllPackageJsonDepsRecursive(internalPackageDirs);

const allDependecyTreePackageNames = allDependecyTreeDirs.map((packagePath) =>
  getPackageNameFromPath(packagePath)
);

console.log(allDependecyTreePackageNames);

allDependecyTreePackageNames.forEach((dep) => {
  fs.rmSync(path.join(__dirname, "../src", dep), {
    recursive: true,
    force: true,
  });
});
