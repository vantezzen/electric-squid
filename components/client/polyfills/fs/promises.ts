import fs from "browserify-fs";
import { promisify } from "util";
import PromiseFsFile from "./PromiseFile";

const fsOpen = promisify(fs.open);
const fsExists = promisify(fs.exists);
const fsMkdir = promisify(fs.mkdir);

export default {
  open: async (...args) => {
    const fileHandle = await fsOpen(...args);
    return new PromiseFsFile(fileHandle);
  },
  stat: promisify(fs.stat),
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  mkdir: async (...args: any[]) => {
    return true;

    let exists = false;
    try {
      exists = await fsExists(args[0]);
    } catch (e) {
      console.log("fs.exists error", e);
    }

    if (!exists) {
      return await fsMkdir(...args);
    }
    return true;
  },
};
