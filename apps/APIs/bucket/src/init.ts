import fs from "fs-extra";
import path from "path";

export const resolvePath = (...pathToResolve: string[]) =>
  path.join(__dirname, `../`, ...pathToResolve);

fs.mkdirSync(resolvePath("public"), { recursive: true });
