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
  .catch(() => {
    revert().then(() => {
      console.log("FAILEDDDDDDDDDDDDDDDDDDDDDDDDDD");
      process.exit(1);
    });
  });

const revert = () => import("./scripts/postbuild.js");
