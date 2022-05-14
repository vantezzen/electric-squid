import fs from "browserify-fs";
import { promisify } from "util";
import PromiseFsFile from "./PromiseFile";

const fsOpen = promisify(fs.open);

export default {
  open: async (...args) => {
    const fileHandle = await fsOpen(...args);
    return new PromiseFsFile(fileHandle);
  },
  stat: promisify(fs.stat),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
};
