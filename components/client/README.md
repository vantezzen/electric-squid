<img src="src/logo.png" width="250" height="250" />

# electric-squid-frontend

This folder hosts the frontend for electric squid.

## Installation

1. Clone the repository
2. Copy ".env.example" to ".env" and customize its contents
3. Open a terminal in this directory (`cd components/clients`)
4. Install the node dependencies via `npm install`
5. After the installation, npm should have already executed the "postinstall" hook. If it hasn't, run `npm run postinstall` manually
6. You can now start the frontend via `npm start` or build using `npm run build`

Make sure to have the proxy started on the same machine. The first start might be slower as webpack will need to build the dependencies.

## Build system

flying-squid and its dependencies are not optimized for building to a static frontend so the build process pushes some systems to their limit.
Due to this, the project uses two separate build systems:

- During development, the project uses vite to provide a hot-reloading, manageble development experience. Due to vite's on-the-fly compilation of dependencies, this provides a better experience than using webpack
- During production, webpack will be used. Rollup (vite's normal build system) crashes when trying to build, so webpack is used instead.<br />
  Still, craco is used to customize some of the webpack config parameter and the RAM is increased to 12GiB as lower caps will result in out-of-memory exceptions.

## Building

You can build the frontend using "npm run build", which will create static output files in "./build". Please note that building the frontend requires at least 12 GiB of RAM as it will crash otherwise.

## Dependency patching

flying-squid and its dependencies and not optimized to run in a browser and thus use some NodeJS-only features. To enable these packages to run in the browser, electric-squid unfortunately needs to use of a lot of manual patching.

These patches include:

- Some patch-package patches (in "patches/") that update some code<br >
  This removes the connection to the Command Line using "readLine" as we don't have that. It also removes dynamic loading of dependencies using variables as the build step requires it to be static.
- Remove "minecraft-data" in sub-packages<br />
  The "minecraft-data" package requires a fix but dependencies use different versions of it. In order to not need to patch every one of the sub-package dependencies using patch-package, electric-squid simply removes those sub-packages to force all dependencies to use the root installation.

## Polyfilling

electric-squid uses various polyfills to let flying-squid run as unmodified as possible. Most importantly, it polyfills "fs" with an extended version of "browserify-fs" to save all data into IndexedDB.
