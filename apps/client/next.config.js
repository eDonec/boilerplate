const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")([
  "core-ui",
  "core-utils",
  "core-hooks",
  "core-next-components",
  "forms",
  "field-validator",
  "auth-sdk",
  "server-sdk",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracing: true,
  distDir: "build",
  eslint: {
    dirs: ["src"],
  },
  webpackDevMiddleware: (config) => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
    };

    return config;
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

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
module.exports = withTM(nextConfig);
