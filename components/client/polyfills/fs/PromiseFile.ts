import fs from "browserify-fs";
import { promisify } from "util";

const writeAsync = promisify(fs.write);
const readAsync = promisify(fs.read);

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
