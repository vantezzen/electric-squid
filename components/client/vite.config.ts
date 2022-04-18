import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
  },
  define: {
    global: {},
    process: {
      env: {},

      // Needed for flying-squid's node version check
      "versions.node": "17.0.0",
    },
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
});
