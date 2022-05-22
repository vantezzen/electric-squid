module.exports = (packageResolve, path) => ({
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

  process: packageResolve("process/browser"),
  util: packageResolve("util"),
  assert: packageResolve("assert"),
  querystring: packageResolve("querystring-es3"),
  stream: packageResolve("stream-browserify"),
  path: packageResolve("path-browserify"),
  http: packageResolve("stream-http"),
  https: packageResolve("https-browserify"),
  url: packageResolve("url"),
  zlib: packageResolve("browserify-zlib"),
  crypto: packageResolve("crypto-browserify"),
  os: packageResolve("os-browserify/browser"),

  // "uuid-1345" is used by flying-squid but internally uses MAC Addresses which are not available in the browser
  "uuid-1345": packageResolve("uuid"),
});
