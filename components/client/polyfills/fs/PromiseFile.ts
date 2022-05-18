import fs from "browserify-fs";
import { promisify } from "util";

const writeAsync = promisify(fs.write);

/**
 * A file instance as created by the `fs.open` method.
 * This only contains the minimal methods flying-squid needs to function
 */
export default class PromiseFsFile {
  constructor(public fileHandle: number) {}

  write(...data: any[]) {
    return writeAsync(this.fileHandle, ...data);
  }
  read(...data: any[]) {
    return new Promise((resolve, reject) => {
      fs.read(this.fileHandle, ...data, (err, bytesRead, buffer) => {
        if (err) reject(err);

        resolve({
          buffer,
        });
      });
    });
  }
}
