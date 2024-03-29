/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import { defineConfig, loadEnv } from "vite";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "BASE_URL_PLACEHOLDER",
  build: {
    outDir: "build",
  },
  server: {
    port: PORT_PLACEHOLDER,
    https:
      process.env.NODE_ENV === "production"
        ? false
        : {
            cert: fs.readFileSync("../../nginx/cert/localhost3000.crt"),
            key: fs.readFileSync("../../nginx/cert/localhost3000.key"),
          },
  },
  plugins: [react(), tsconfigPaths(), eslint()],
  define: {
    "process.env": loadEnv(mode, process.cwd(), ""),
  },
}));
