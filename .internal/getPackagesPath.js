const fs = require("fs");
const path = require("path");
const mainPackage = require("../package.json");

const workspaces = mainPackage.workspaces;

const packagesFolder = workspaces.map((workspace) =>
  path.join(__dirname, "../", workspace).replace("*", "")
);

const _overlappingNodePackageFolders = [];

for (const folder of packagesFolder) {
  for (const lookupFolder of packagesFolder) {
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

const internalNodePackages = packagesFolder
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

const packageJsonFile = internalNodePackages.map((internalNodePackage) =>
  internalNodePackage.packages.map((packageName) => {
    return path.join(internalNodePackage.rootDir, packageName, "package.json");
  })
);

const packageJsonFileFlat = packageJsonFile.flat();

const packageJsonFileFlatUnique = packageJsonFileFlat.filter(
  (path, index, self) => index === self.findIndex((t) => t === path)
);

const allJSONFiles = [...packageJsonFileFlatUnique];
const allPackagesWithTestScripts = [];

// TODO: clean up the requires in those folders
allJSONFiles.forEach((jsonPath) => {
  const buffer = fs.readFileSync(jsonPath);
  const jsonString = buffer.toString();
  const packageJson = JSON.parse(jsonString);
  if (packageJson.scripts?.test)
    allPackagesWithTestScripts.push({ name: packageJson.name, jsonPath });
});

allPackagesWithTestScripts.forEach((package) => {
  package.jsonPath = package.jsonPath.replace(/\\/g, "/");
});
const appsWithTestScript = allPackagesWithTestScripts
  .filter((package) => package.jsonPath.includes("apps"))
  .map((package) => ({
    packageName: package.name,
    packagePath: `apps/${package.jsonPath
      .split("/apps/")[1]
      .replace("/package.json", "/**")}`,
    isApp: true,
  }));
const packagesWithTestScripts = allPackagesWithTestScripts
  .filter((package) => !package.jsonPath.includes("apps"))
  .map((package) => ({
    packageName: package.name,
    packagePath: `packages/${package.jsonPath
      .split("/packages/")[1]
      .replace("/package.json", "/**")}`,
    isApp: false,
  }));

module.exports = {
  packagesWithTestScripts,
  appsWithTestScript,
};
