const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const internalModules = require("./scripts/getInternalDependencies");
const withTM = require("next-transpile-modules")(internalModules);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: true,
  distDir: "build",
  eslint: {
    dirs: ["src"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },

  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts"],
  output: "standalone",
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
module.exports = withTM(nextConfig);
