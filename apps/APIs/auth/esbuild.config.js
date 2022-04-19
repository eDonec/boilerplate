const esbuild = require("esbuild");

// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const define = {};

for (const k in process.env) {
  if (!(k.startsWith("ProgramFiles") || k.startsWith("CommonProgramFiles")))
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

console.log(define);
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
