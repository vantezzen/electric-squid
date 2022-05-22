import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import buildAliases from "./buildAliases";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: buildAliases((str) => str, path),
  },
});
