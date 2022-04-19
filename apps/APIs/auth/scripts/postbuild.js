/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
// requiring path and fs modules
const fs = require("fs");
const path = require("path");
const tsconfig = require("../tsconfig.json");
const mainPackage = require("../../../../package.json");
const buildPath = path.join(__dirname, `../${tsconfig.compilerOptions.outDir}`);
const glob = require("glob");
const sourcePath = path.join(
  __dirname,
  `../${tsconfig.compilerOptions.baseUrl}`
);
const workspaces = mainPackage.workspaces;
console.log(glob.sync(path.join(__dirname, "../../../../", "apps/*")));
const internalPackages = workspaces
  .filter(
    (workspace) => !workspace.includes("apps") && !workspace.includes("browser")
  )
  .map((workspace) => {
    console.log("Path: ", path.join(__dirname, "../../../../", workspace));
    return fs
      .readdirSync(
        path.join(__dirname, "../../../../", workspace).replace("*", ""),
        { withFileTypes: true }
      )
      .filter((dirent) => dirent.isDirectory());
  })
  .map((package) => package.map((dirent) => dirent.name))
  .flat(1);

// const sourceFolders = fs.readdirSync(sourcePath);

// const absoluteRoutes = sourceFolders.filter(
//   (route) =>
//     !["__test__", "coverage", "__mock__"].includes(route) &&
//     !route.match(/\.js|\.map?$/)
// );

fs.readdir(buildPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(`Unable to scan directory: ${err}`);
    return;
  }
  sortImportsInFolder(files, buildPath, 0);
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
    internalPackages.forEach((route) => {
      _data = _data.replace(
        new RegExp(`"(${route}(?=[/|"]))`, "g"),
        `"${route}/build/cjs`
      );
    });
    fs.writeFile(_path, _data, (error) => {
      if (error) console.log(error);
    });
  });
};
console.log("module resolved");
