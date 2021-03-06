import fs from "browserify-fs";
import { promisify } from "util";
import PromiseFsFile from "./PromiseFile";

const fsOpen = promisify(fs.open);
const fsStat = promisify(fs.stat);
const fsMkdir = promisify(fs.mkdir);

const promiseFs = {
  open: async (...args) => {
    const fileHandle = await fsOpen(...args);
    return new PromiseFsFile(fileHandle);
  },
  stat: promisify(fs.stat),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  mkdir: async (folder) => {
    try {
      await fsStat(folder);
    } catch (err) {
      await fsMkdir(folder, { recursive: true });
    }
  },
};
export default promiseFs;
