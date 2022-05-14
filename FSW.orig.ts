import supportFeature from "flying-squid/src/lib/supportFeature";
import Command from "flying-squid/src/lib/command";

import EventEmitter from "events";
import { supportedVersions } from "minecraft-protocol";

//import buildInPlugins from "./buildInPlugins";
import FlyingSquidServerMock from "./FlyingSquidServerMock";
import NetworkConnection from "../network/NetworkConnection";

const debug = require("debug")("squid:FlyingSquidWrapper");

export type SquidConfig = {
  version: string;
  motd: string;
  port: number;
};

/**
 * Replacement for the flying squid initializer (https://github.com/PrismarineJS/flying-squid/blob/master/src/index.js)
 */
export default class FlyingSquidWrapper extends EventEmitter {
  private version = this.getVersionInfo();
  public commands = new Command({});
  public _server = new FlyingSquidServerMock(this);

  constructor(public config: SquidConfig, public network: NetworkConnection) {
    super();

    debug("Initializing FlyingSquidWrapper");

    this.setupServer();
  }

  setupServer() {
    this.checkIfVersionIsSupportedOrThrow();
    this.setupPlugins();

    this._server.on("error", (error) => this.emit("error", error));
    this._server.on("listening", () =>
      this.emit("listening", this.config.port)
    );
    this.emit("asap");
  }

  private getVersionInfo() {
    return require("minecraft-data")(this.config.version).version;
  }

  private checkIfVersionIsSupportedOrThrow() {
    if (!supportedVersions.some((v) => v.includes(this.version.majorVersion))) {
      throw new Error(
        `Version ${this.version.minecraftVersion} is not supported.`
      );
    }
  }

  private setupPlugins() {
    /*for (const pluginNameString in buildInPlugins) {
      const pluginName = pluginNameString as keyof typeof buildInPlugins;
      debug(`Loading plugin ${pluginName}`);

      if (buildInPlugins[pluginName].server) {
        buildInPlugins[pluginName].server(this, this.config);
      }
    }*/
    debug("All plugins loaded");
  }

  public supportFeature(feature: any) {
    debug(`Supporting feature ${feature}`);
    return supportFeature(feature, this.version.majorVersion);
  }
}
