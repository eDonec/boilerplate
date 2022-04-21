/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mainPackage = require("../package.json");

const workspaces = mainPackage.workspaces;

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
    return path.join(internalNodePackage.rootDir, packageName, "build");
  })
);

const packagesBuildPathsFlat = packagesBuildPaths.flat();

const packagesBuildPathsFlatUnique = packagesBuildPathsFlat.filter(
  (path, index, self) => index === self.findIndex((t) => t === path)
);

const allBuildPaths = [...packagesBuildPathsFlatUnique];

// TODO: clean up the requires in those folders
allBuildPaths.forEach((buildPath) => {
  fs.readdir(buildPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(`Unable to scan directory: ${err}`);
      return;
    }
    sortImportsInFolder(files, buildPath, 0);
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
};
const depthToString = (depth) => {
  if (depth === 0) return '"./';
  let res = '"';
  for (let index = 0; index < depth; index++) {
    res = `${res}../`;
  }
  return res;
};
const sortImportsInFile = (file, _path, depth) => {
  const _depth = depthToString(depth);
  fs.readFile(_path, (err, data) => {
    if (err) throw err;
    let _data = data.toString();
    internalNodePackageNames.forEach((route) => {
      _data = _data.replace(
        new RegExp(`"(${route}(?=[/|])(?!\/build))`, "g"),
        `"${route}/build/cjs`
      );
    });
    fs.writeFile(_path, _data, (error) => {
      if (error) console.log(error);
    });
  });
};

console.log("Module imports sorted for packages!");
