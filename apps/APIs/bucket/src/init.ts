import path from "path";

export const resolvePath = (pathToResolve: string) =>
  path.join(__dirname, `../${pathToResolve}`);
