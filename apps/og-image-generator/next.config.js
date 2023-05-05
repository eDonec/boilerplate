const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const internalModules = require("./scripts/getInternalDependencies");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/og-image",
  outputFileTracing: true,
  distDir: "build",
  eslint: {
    dirs: ["src"],
  },

  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
  output: "standalone",
  transpilePackages: internalModules,
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },
};
module.exports = nextConfig;
