/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
// requiring path and fs modules
const fs = require("fs");
const path = require("path");
const mainPackage = require("../../../../package.json");
const rootDirReturns = "../../../../";

const workspaces = mainPackage.workspaces;

const nodeAppsPath = path
  .join(
    __dirname,
    rootDirReturns,
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
  .map((workspace) =>
    path.join(__dirname, rootDirReturns, workspace).replace("*", "")
  );

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

const internalNodePackages = internalNodePackageFolders
  .map((folder) => {
    try {
      return {
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
      };
    } catch (error) {
      console.log(`path ${folder} not found! continuing...`);
    }
  })
  .filter((o) => o !== undefined);

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
const reversionJson = path.join(__dirname, "reversion.json");
const reversions = [];
const sortImportsInFile = (file, _path, depth) => {
  if (!_path.match(/\.t(s|x)$/) || _path.includes("__")) return;
  const _depth = resolveDepthRelativeToApp(_path);
  const data = fs.readFileSync(_path);
  let _data = data.toString();
  const reversion = {
    filePath: _path,
    edits: [],
  };
  for (const route of packageAndPathObject) {
    const lineToInsert = `"${_depth}${route.path}`.replace(/\\/g, "/");
    _data = _data.replace(
      new RegExp(`"(${route.packageName}(?=[/|"])(?!\/build))`, "g"),
      lineToInsert
    );
    reversion.edits.push({
      insertedLine: lineToInsert,
      removedLine: `"${route.packageName}`,
    });
  }
  reversions.push(reversion);
  fs.writeFileSync(_path, _data);
  fs.writeFileSync(reversionJson, JSON.stringify(reversions));
};
const os = require("os");
const resolveDepthRelativeToApp = (filePath) => {
  // trim string before apps
  const trimmedFilePath = filePath.substring(filePath.indexOf("apps"));
  // count number pf slashes in trimmed path
  const depth =
    trimmedFilePath.split(os.platform() === "win32" ? "\\" : "/").length - 1;
  // const newPath = path.join(filePath, depthToString(depth + 1), "packages");
  const depthRoute = depthToString(depth);
  console.log({ filePath, depthRoute, depth });
  return `${depthRoute}packages`;
};

const depthToString = (depth) => {
  if (depth === 0) return "../";
  let res = "";
  for (let index = 0; index < depth; index++) {
    res = `${res}../`;
  }
  return res;
};
