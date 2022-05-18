const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      util: require.resolve("util"),
      assert: require.resolve("assert"),
      path: require.resolve("path-browserify"),
      fs: path.resolve(__dirname, "polyfills", "fs", "index.ts"),
      querystring: require.resolve("querystring-es3"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url"),
      zlib: require.resolve("browserify-zlib"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
