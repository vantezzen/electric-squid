import { Buffer } from "buffer";

if (typeof (window as any).global === "undefined") {
  (window as any).global = window;
}
(window as any).Buffer = Buffer;

(window as any).process = {
  env: {},

  // Needed for flying-squid's node version check
  versions: {
    node: "17.0.0",
  },

  // Indicate to packages that the script will run in the browser
  browser: true,

  // Needed for the colors library
  argv: "",

  nextTick: (callback: (...data: any[]) => any, ...data: any[]) => {
    setTimeout(() => {
      callback(...data);
    }, 0);
  },
};
