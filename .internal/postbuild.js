/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
// requiring path and fs modules
const fs = require("fs");
const path = require("path");
// const tsconfig = require("../tsconfig.json");
const mainPackage = require("../package.json");
// const buildPath = path.join(__dirname, `../${tsconfig.compilerOptions.outDir}`);
// const sourcePath = path.join(
//   __dirname,
//   `../${tsconfig.compilerOptions.baseUrl}`
// );
const workspaces = mainPackage.workspaces;

const internalNodePackageFolders = workspaces
  .filter(
    (workspace) =>
      !workspace.includes("apps") &&
      !workspace.includes("browser") &&
      !workspace.includes("config")
  )
  .map((workspace) => {
    return path.join(__dirname, "../", workspace).replace("*", "");
  });

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

console.log(
  internalNodePackageFolders,
  internalNodePackages,
  overlappingNodePackageFolders
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

// TODO: return all the paths for the builds in the wrorkspace

console.log(packagesBuildPathsFlatUnique);

// TODO: clean up the requires in those folders
// TODO: lookup the apps/APIs and do the same
// TODO: and there ya go

// fs.readdir(buildPath, { withFileTypes: true }, (err, files) => {
//   if (err) {
//     console.log(`Unable to scan directory: ${err}`);
//     return;
//   }
//   sortImportsInFolder(files, buildPath, 0);
// });

// const sortImportsInFolder = (fileOrFolder, _path, depth) => {
//   if (!Array.isArray(fileOrFolder) && !fileOrFolder.isDirectory()) {
//     sortImportsInFile(fileOrFolder, _path, depth);
//   } else if (Array.isArray(fileOrFolder)) {
//     fileOrFolder.forEach((file) => {
//       if (file.isDirectory()) {
//         sortImportsInFolder(file, path.join(_path, file.name), depth);
//       } else {
//         sortImportsInFile(file, path.join(_path, file.name), depth);
//       }
//     });
//   } else {
//     fs.readdir(_path, { withFileTypes: true }, (err, files) => {
//       if (err) {
//         console.log(`Unable to scan directory: ${err}`);
//       }
//       sortImportsInFolder(files, _path, depth + 1);
//     });
//   }
// };
// const depthToString = (depth) => {
//   if (depth === 0) return '"./';
//   let res = '"';
//   for (let index = 0; index < depth; index++) {
//     res = `${res}../`;
//   }
//   return res;
// };
// const sortImportsInFile = (file, _path, depth) => {
//   const _depth = depthToString(depth);
//   fs.readFile(_path, (err, data) => {
//     if (err) throw err;
//     let _data = data.toString();
//     internalPackages.forEach((route) => {
//       _data = _data.replace(
//         new RegExp(`"(${route}(?=[/|"]))`, "g"),
//         `"${route}/build/cjs`
//       );
//     });
//     fs.writeFile(_path, _data, (error) => {
//       if (error) console.log(error);
//     });
//   });
// };
// console.log("module resolved");
