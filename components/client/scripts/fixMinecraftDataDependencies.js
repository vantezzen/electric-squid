/**
 * Fix Minecraft data dependencies:
 * Remove minecraft-data installations in sub-directories of other packages so that
 * all dependencies are resolved from the root package.
 *
 * This way, we don't need to patch each sub-package individually
 */
const fs = require("fs");
const path = require("path");

console.log("Fixing Minecraft data dependencies...");

// Source: https://stackoverflow.com/a/24594123/10590162
const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const nodeModuleFolder = path.join(__dirname, "..", "node_modules");
const nodeModules = getDirectories(nodeModuleFolder);

for (const package of nodeModules) {
  const packageFolder = path.join(nodeModuleFolder, package);
  const minecraftDataFolder = path.join(
    packageFolder,
    "node_modules",
    "minecraft-data"
  );

  if (fs.existsSync(minecraftDataFolder)) {
    console.log(
      `Found sub-package minecraft-data in ${package} at ${minecraftDataFolder}`
    );
    fs.rmSync(minecraftDataFolder, { recursive: true });
  }
}
