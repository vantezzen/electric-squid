const path = require(`path`);

module.exports = {
  webpack: {
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
};
