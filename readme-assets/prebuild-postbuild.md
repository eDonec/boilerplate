# Build Process for express apps

## Table of content

- [Build Process for express apps](#build-process-for-express-apps)
  - [Table of content](#table-of-content)
  - [Problem](#problem)
  - [Solution](#solution)
    - [Use `esbuild`](#use-esbuild)
    - [Prebuild and Postbuild scripts](#prebuild-and-postbuild-scripts)
      - [Building all dependant packages](#building-all-dependant-packages)
      - [Prebuild script](#prebuild-script)
      - [The prebuild script explained](#the-prebuild-script-explained)
      - [Post build script](#post-build-script)
    - [Post build script for packages](#post-build-script-for-packages)

## Problem

No standard build process exists for express microservice apps that live in a monorepo out there.

The issue that comes when trying to build with `tsc` is

- The absolute imports are not resolved (`baseUrl` from `tsconfig.json` are not taken into account while converting to js output)
- The fact that imported internal packages are not bundled into the final output

## Solution

### Use `esbuild`

Using `esbuild` the first concern is handled for us out of the box. Although, a few problems appeared while trying to integrate `esbuild`

- The first issue is bundling environment variables with the build, to fix this we added this snippet :

```javascript
const define = {};

for (const k in process.env) {
  if (
    !(
      k.startsWith("ProgramFiles") ||
      k.startsWith("CommonProgramFiles") ||
      k.includes(" ")
    )
  )
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}
```

Further explanation… <br>
The following statement is added to prevent random system env variables to be added to the final build

```javascript
  if (
    !(
      k.startsWith("ProgramFiles") ||
      k.startsWith("CommonProgramFiles") ||
      k.includes(" ")
    )
```

- The second issue was the fact that some external libraries are not "build friendly" `bcrypt` is one of them <br><br>
  To solve this, we added yet another build library that integrates as a plugin to `esbuild`. The library is `esbuild-node-externals` and in order to add it the following code needs to be added:

```javascript
const { nodeExternalsPlugin } = require("esbuild-node-externals");


// ...the rest of the config

    plugins: [nodeExternalsPlugin()],
// ... the rest of the file
```

Finally, we ended up with the following `esbuild.config.js` file

```javascript
const esbuild = require("esbuild");

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require("esbuild-node-externals");

const define = {};

for (const k in process.env) {
  if (
    !(
      k.startsWith("ProgramFiles") ||
      k.startsWith("CommonProgramFiles") ||
      k.includes(" ")
    )
  )
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}
esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outdir: "build",
    bundle: true,
    minify: false,
    platform: "node",
    sourcemap: true,
    tsconfig: "tsconfig.prod.json",
    target: ["node14"],
    plugins: [nodeExternalsPlugin()],
    define,
  })
  .catch(() => process.exit(1));
```

and in the `package.json` we changed the build script to be:

```diff
-     "build": "tsc",

+     "build": "node esbuild.config.js",
```

### Prebuild and Postbuild scripts

Sence all of our files are in typescript, simply referencing them from the javascript build is not enough. We first need to build all of our packages and then we can reference them from the javascript build. <br>

#### Building all dependant packages

In order to do that we need to standardize their build script in order to be able to use them in the javascript build.

The following was needed to be added to the `package.json` file:

```diff
{
  "name": "some-package",
  "version": "0.0.0",
  "private": true,
+  "main": "./build/cjs/index.js",
+  "module": "./build/esm/index.js",
+  "types": "./build/esm/index.d.ts",
+  "files": [
+    "/build/cjs",
+    "/build/esm"
+  ],
  "scripts": {
-    "build": "tsc",
+    "build": "yarn clean && yarn build:esm && yarn build:cjs",
+    "clean": "rimraf build",
+    "build:esm": "tsc -p tsconfig.prod.json --module ES2022 --outDir build/esm",
+    "build:cjs": "tsc -p tsconfig.prod.json --module commonjs --outDir build/cjs",
    "test": "jest --coverage",
    "lint": "eslint --fix"
  },
```

With the addition of a tsconfig.prod.json file, we can now use the `tsc` command to build the typescript files While leaving out the `__test__` and mocks...

**Standard `tsconfing.prod.json` file:**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "exclude": [
    "build",
    "coverage",
    "node_modules",
    ".turbo",
    "coverage",
    "dist",
    "**/__test__",
    "__test__",
    "__mocks__",
    "**/__mocks__",
    "*.config.js",
    ".env",
    "src/**/*.test.ts"
  ]
}
```

#### Prebuild script

After building the packages we still need to tell the app where to go find the built modules and that **is before starting the esbuild bundling process.**

and this issue is present especially if we have imported a file from an internal package (i.e. `@some-package/some-file`)

Our first mission is to make all internal packages available to the javascript build. through relative imports **monorepo scope**.
In other words, if we are in `apps/APIs/auth/src/index.ts` and we find the following line in the file:

```typescript
import clsx from "core-utils/clsx";
```

it needs to be transformed to

```typescript
import clsx from "../../../../packages/node/core-utils/build/esm/clsx";
```

going back four levels to the root of the project. And then accessing the built files from the build folder from the package folder.

The following script was done to achieve this:

#### The prebuild script explained

We will be needing `fs` and `path` for file management in the script.

We will also need to to get the main package.json of the monorepo as well how deep are we in the monorepo.

```javascript
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
// requiring path and fs modules
const fs = require("fs");
const path = require("path");
const mainPackage = require("../../../../package.json");
const rootDirReturns = "../../../../";
```

We first extract the source path of the current package.

```javascript
const appPath = path.join(__dirname, "../");

const sourcePath = path.join(appPath, "src");
```

Starting with the workspaces from the monorepo, we will be iterating over them. To get the list of all internal packages that are not apps nor config nor browser packages:

```javascript
const workspaces = mainPackage.workspaces;

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
```

We then get a list of all folders in that workspace list. and then filter out any overlapping folders like `node/api-types` that contain further packages whereas the `node` folder is root for other packages directly.

```javascript
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
```

We then fetch the package names from the list previously prepared and create a new array containing both the package name nad the the build path.

```javascript
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

const packageAndPathObject = internalNodePackageNames.map((packageName) => ({
  packageName,
  path: packagesBuildPathsFlatUnique.find((o) => o.includes(packageName)),
}));
```

Now all we need to do is to go at this recursivly replacing within each file the relavent imports with the correct path.
start by reading everything in the current projects folder.

```javascript
fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(`Unable to scan directory: ${err}`);
    return;
  }
  sortImportsInFolder(files, sourcePath, 0);
});
```

And then we can start the recursion. If the read item is no file or folder we call the transformer function else we recurse.

```javascript
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
```

The transformer function is simply a regex replace all in each file using all the package names that was previously prepared, What is also noteworthy is the logging of every operation inside of `revrsion.json` that will serve us later in this explanation.

```javascript
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
```

Both `resolveDepthRelativeToApp` and `depthToString` are utility functions that return the relative depth of a file relative to the root of the app.

```javascript
const os = require("os");
const resolveDepthRelativeToApp = (filePath) => {
  // trim string before apps
  const trimmedFilePath = filePath.substring(filePath.indexOf("apps"));
  // count number pf slashes in trimmed path
  const depth =
    trimmedFilePath.split(os.platform() === "win32" ? "\\" : "/").length - 1;
  // const newPath = path.join(filePath, depthToString(depth + 1), "packages");
  const depthRoute = depthToString(depth);
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
```

#### Post build script

After doing all the transformation that we did to the files of the project a traceback needs to be done in order for the dev environment to remine the same.

Hence the recursion.json that was previously generated that contains an array of:

```json
 "filePath": "some-path",
 "edits": [{
   "insertedLine": "what was inserted",
   "removedLine": "What was removed",
 }],
```

Using this we can retrace all the changes and revert them back to their original form

```javascript
const fs = require("fs");
const path = require("path");
const reversionPath = path.join(__dirname, "reversion.json");
const revisions = JSON.parse(fs.readFileSync(reversionPath).toString());
console.log(revisions);
for (const revision of revisions) {
  const data = fs.readFileSync(revision.filePath);
  let _data = data.toString();
  for (const edit of revision.edits) {
    _data = _data.replace(new RegExp(edit.insertedLine, "g"), edit.removedLine);
  }
  fs.writeFileSync(revision.filePath, _data);
}

fs.unlinkSync(reversionPath);
console.log("files reverted");
```

### Post build script for packages

Furthermore the packages need to be transformed in order to be able to be used in the build process.

The trasformation is similar to the one done to the main apps with a few minor changes to the timing.

**TL&DR** The trasformation is done to the built output for the imported internal packages

Same as for the apps the `js` output cannot read packages that are written in typescript espacially for imported files from the packages such as `@some-package/some-file` so the only thing that needs to be done is to replace the `@some-package/some-file` with the correct path (i.e. `@some-package/build/cjs/some-file`)
