import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      zlib: "browserify-zlib",
      util: "util",
      assert: "assert",
      fs: path.resolve(__dirname, "polyfills", "fs", "index.ts"),
      path: "path-browserify",
    },
  },
});
