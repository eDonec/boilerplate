const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const internalModules = require("./scripts/getInternalDependencies");
/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: true,
  distDir: "build",
  eslint: {
    dirs: ["src"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
    localeDetection: false,
  },
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
  transpilePackages: internalModules,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    scrollRestoration: true,
  },
  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },
};
module.exports = nextConfig;
