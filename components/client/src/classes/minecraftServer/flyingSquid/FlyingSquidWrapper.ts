import supportFeature from "flying-squid/src/lib/supportFeature";
import Command from "flying-squid/src/lib/command";

import EventEmitter from "events";
import { supportedVersions } from "minecraft-protocol";

import CauldronFrontendServer from "../CauldronFrontendServer";
import buildInPlugins from "./buildInPlugins";
import FlyingSquidServerMock from "./FlyingSquidServerMock";

export default class FlyingSquidWrapper extends EventEmitter {
  private version = this.getVersionInfo();
  public commands = new Command({});
  public _server = new FlyingSquidServerMock(this);

  constructor(public server: CauldronFrontendServer) {
    super();
    this.setupServer();
  }

  setupServer() {
    this.checkIfVersionIsSupportedOrThrow();
    this.setupPlugins();

    this._server.on("error", (error) => this.emit("error", error));
    this._server.on("listening", () =>
      this.emit("listening", this.server.config.port)
    );
    this.emit("asap");
  }

  private getVersionInfo() {
    return require("minecraft-data")(this.server.config.version).version;
  }

  private checkIfVersionIsSupportedOrThrow() {
    if (!supportedVersions.some((v) => v.includes(this.version.majorVersion))) {
      throw new Error(
        `Version ${this.version.minecraftVersion} is not supported.`
      );
    }
  }

  private setupPlugins() {
    for (const pluginNameString in buildInPlugins) {
      const pluginName = pluginNameString as keyof typeof buildInPlugins;

      if (buildInPlugins[pluginName].server) {
        buildInPlugins[pluginName].server(this, this.server.config);
      }
    }
  }

  public supportFeature(feature: any) {
    return supportFeature(feature, this.version.majorVersion);
  }
}
