/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
// requiring path and fs modules
const { count } = require("console");
const fs = require("fs");
const path = require("path");
const mainPackage = require("../package.json");

// TODO: Change the logic to be like following:
// TODO: 1. build the packages
// TODO: 2. sort the imports in the packages
// TODO: 3. swap the imports in the apps to be relative to build/esm
// TODO: 4. end the prebuild script
// TODO: 5. build the apps
// TODO: 6. start the postbuild script
// TODO: 7. revert the changes in the apps
// TODO: 8. clean everything

const workspaces = mainPackage.workspaces;

const nodeAppsPath = path
  .join(
    __dirname,
    "../",
    workspaces.find((workspace) => workspace.includes("APIs"))
  )
  .replace("*", "");

const nodeAppNames = fs
  .readdirSync(nodeAppsPath, {
    withFileTypes: true,
  })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);
const nodeAppSourcePaths = nodeAppNames.map((nodeAppName) => {
  return path.join(nodeAppsPath, nodeAppName, "src");
});
const nodeAppBuildPaths = nodeAppSourcePaths.map((nodeApp) =>
  path.join(nodeApp, "../build")
);

const internalNodePackageFolders = workspaces
  .filter(
    (workspace) =>
      !workspace.includes("apps") &&
      !workspace.includes("browser") &&
      !workspace.includes("config")
  )
  .map((workspace) => path.join(__dirname, "../", workspace).replace("*", ""));

const _overlappingNodePackageFolders = [];

for (const folder of internalNodePackageFolders) {
  for (const lookupFolder of internalNodePackageFolders) {
    if (lookupFolder.includes(folder)) {
      _overlappingNodePackageFolders.push(
        lookupFolder.replace(`${folder}`, "")
      );
    }
  }
}
const overlappingNodePackageFolders = _overlappingNodePackageFolders
  .filter((o) => o !== "")
  .map((o) => o.replace(/[\/\\]$/g, ""));

const internalNodePackages = internalNodePackageFolders.map((folder) => ({
  rootDir: folder,
  packages: fs
    .readdirSync(folder, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter(
      (packageName) =>
        ![...overlappingNodePackageFolders, "node_modules"].includes(
          packageName
        )
    ),
}));

const internalNodePackageNames = internalNodePackages.flatMap(
  (packages) => packages.packages
);

const packagesBuildPaths = internalNodePackages.map((internalNodePackage) =>
  internalNodePackage.packages.map((packageName) => {
    return path.join(internalNodePackage.rootDir, packageName, "build/esm");
  })
);

const packagesBuildPathsFlat = packagesBuildPaths.flat();

const packagesBuildPathsFlatUnique = packagesBuildPathsFlat
  .filter((path, index, self) => index === self.findIndex((t) => t === path))
  .map((p) => p.substring(p.indexOf("packages") + "packages".length));

const allBuildPaths = [...nodeAppBuildPaths, ...packagesBuildPathsFlatUnique];

const packageAndPathObject = internalNodePackageNames.map((packageName) => ({
  packageName,
  path: packagesBuildPathsFlatUnique.find((o) => o.includes(packageName)),
}));

console.log(packageAndPathObject);
nodeAppSourcePaths.forEach((sourcePath) => {
  fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(`Unable to scan directory: ${err}`);
      return;
    }
    sortImportsInFolder(files, sourcePath, 0);
  });
});

const sortImportsInFolder = (fileOrFolder, _path, depth) => {
  if (!Array.isArray(fileOrFolder) && !fileOrFolder.isDirectory()) {
    sortImportsInFile(fileOrFolder, _path, depth);
  } else if (Array.isArray(fileOrFolder)) {
    fileOrFolder.forEach((file) => {
      if (file.isDirectory()) {
        sortImportsInFolder(file, path.join(_path, file.name), depth);
      } else {
        sortImportsInFile(file, path.join(_path, file.name), depth);
      }
    });
  } else {
    fs.readdir(_path, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
      }
      sortImportsInFolder(files, _path, depth + 1);
    });
  }
  // console.log("module resolved for following path: ", _path);
};

const sortImportsInFile = (file, _path, depth) => {
  if (!_path.match(/\.t(s|x)$/) || _path.includes("__")) return;
  const _depth = resolveDepthRelativeToApp(_path);
  fs.readFile(_path, (err, data) => {
    if (err) throw err;
    let _data = data.toString();
    packageAndPathObject.forEach((route) => {
      _data = _data.replace(
        new RegExp(`"(${route.packageName}(?=[/|])(?!\/build))`, "g"),
        `"${_depth}${route.path}`
      );
    });
    fs.writeFile(_path, _data, (error) => {
      if (error) console.log(error);
    });
  });
};

const resolveDepthRelativeToApp = (filePath) => {
  // trim string before apps
  const trimmedFilePath = filePath.substring(filePath.indexOf("apps"));
  // count number pf slashes in trimmed path
  const depth = trimmedFilePath.split("/").length - 1;
  // const newPath = path.join(filePath, depthToString(depth + 1), "packages");
  const depthRoute = depthToString(depth);
  return `${depthRoute.substring(0, depthRoute.length - 2)}/packages`;
};

const depthToString = (depth) => {
  if (depth === 0) return "./";
  let res = "";
  for (let index = 0; index < depth; index++) {
    res = `${res}../`;
  }
  return res;
};
