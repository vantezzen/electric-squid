const path = require(`path`);
const ChunkProgressWebpackPlugin = require("chunk-progress-webpack-plugin");
const buildAliases = require("./buildAliases");

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
    alias: buildAliases(require.resolve, path),
    plugins: {
      add: [new ChunkProgressWebpackPlugin()],
    },
  },
};
