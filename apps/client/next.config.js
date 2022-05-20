const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")([
  "core-utils",
  "core-ui",
  "core-hooks",
  "core-next-components",
  "forms",
  "field-validator",
  "auth-sdk",
  "server-sdk",
  "bucket-sdk",
  "shared-types",
]);

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
  pageExtensions: ["page.tsx"],
  experimental: {
    outputStandalone: true,
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
