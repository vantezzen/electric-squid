import supportFeature from "flying-squid/src/lib/supportFeature";
import Command from "flying-squid/src/lib/command";
import MinecraftData from "minecraft-data";

import EventEmitter from "events";

import buildInPlugins from "./buildInPlugins";
import FlyingSquidServerMock from "./FlyingSquidServerMock";
import NetworkConnection from "../network/NetworkConnection";
import debugging from "debug";
const debug = debugging("cauldron:FlyingSquidServerMock");

export type CauldronConfig = {
  version: string;
  motd: string;
  port: number;
  plugins: [];
};

/**
 * Replacement for the flying squid initializer (https://github.com/PrismarineJS/flying-squid/blob/master/src/index.js)
 */
export default class FlyingSquidWrapper extends EventEmitter {
  private version?: any;
  public commands = new Command({});
  public _server?: FlyingSquidServerMock;

  constructor(
    public config: CauldronConfig,
    public network: NetworkConnection
  ) {
    super();

    debug("Initializing FlyingSquidWrapper");

    this.setupServer();
  }

  async setupServer() {
    this.version = await this.getVersionInfo();
    this._server = new FlyingSquidServerMock(this);

    this.checkIfVersionIsSupportedOrThrow();
    await this.setupPlugins();

    this._server.on("error", (error) => this.emit("error", error));
    this._server.on("listening", () =>
      this.emit("listening", this.config.port)
    );
    this.emit("asap");
  }

  private async getVersionInfo() {
    return import(`minecraft-data/minecraft-data/data/pc/1.18.2/version.json`);
  }

  private checkIfVersionIsSupportedOrThrow() {}

  private async setupPlugins() {
    for (const pluginNameString in buildInPlugins) {
      const pluginName = pluginNameString as keyof typeof buildInPlugins;
      const loadPlugin = buildInPlugins[pluginName];
      debug(`Loading plugin ${pluginName}`);

      const plugin = await loadPlugin();
      if (plugin.server) {
        plugin.server(this, this.config);
      }
    }
    debug("All plugins loaded");
  }

  public supportFeature(feature: any) {
    debug(`Supporting feature ${feature}`);
    return supportFeature(feature, this.version.majorVersion);
  }
}
