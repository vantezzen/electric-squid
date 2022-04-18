import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
  },
  define: {
    process: {
      env: {},

      // Needed for flying-squid's node version check
      versions: {
        node: "17.0.0",
      },

      // Indicate to packages that the script will run in the browser
      browser: true,

      // Needed for the colors library
      argv: "",
    },
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      zlib: "browserify-zlib",
      util: "util",
      fs: "browserify-fs",
    },
  },
});
