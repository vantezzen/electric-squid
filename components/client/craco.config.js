const path = require(`path`);
const ChunkProgressWebpackPlugin = require("chunk-progress-webpack-plugin");

module.exports = {
  babel: {
    presets: [],
    plugins: [],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      console.log(`babelLoaderOptions:`, babelLoaderOptions);

      return babelLoaderOptions;
    },
  },

  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.stats = "verbose";
      webpackConfig.infrastructureLogging = {
        colors: true,
        level: "log",
      };
      webpackConfig.performance = {
        hints: "warning",
        maxAssetSize: 2000,
        maxEntrypointSize: 4000,
        assetFilter: () => true,
      };

      console.log("WP", webpackConfig);
      return webpackConfig;
    },
    alias: {
      fs: path.resolve(__dirname, "src", "polyfills", "fs", "index.js"),
      net: path.resolve(__dirname, "src", "polyfills", "net", "index.js"),
      dns: path.resolve(__dirname, "src", "polyfills", "dns", "index.js"),
      perf_hooks: path.resolve(
        __dirname,
        "src",
        "polyfills",
        "perf_hooks",
        "index.js"
      ),

      process: require.resolve("process/browser"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      util: require.resolve("util"),
      assert: require.resolve("assert"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      url: require.resolve("url"),
      zlib: require.resolve("browserify-zlib"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),

      // "uuid-1345" is used by flying-squid but internally uses MAC Addresses which are not available in the browser
      "uuid-1345": require.resolve("uuid"),
    },
    plugins: {
      add: [new ChunkProgressWebpackPlugin()],
    },
  },
};
