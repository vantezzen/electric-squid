import supportFeature from "flying-squid/src/lib/supportFeature";
import Command from "flying-squid/src/lib/command";
import fs from "fs";
import EventEmitter from "events";

import buildInPlugins from "./buildInPlugins";
import FlyingSquidServerMock from "./FlyingSquidServerMock";
import NetworkConnection from "../network/NetworkConnection";
import debugging from "debug";
const debug = debugging("cauldron:FlyingSquidServerMock");

export type CauldronConfig = {
  version: string;
  motd: string;
};
export type FlyingSquidConfig = {
  [key: string]: any;
};

/**
 * Replacement for the flying squid initializer (https://github.com/PrismarineJS/flying-squid/blob/master/src/index.js)
 */
export default class FlyingSquidWrapper extends EventEmitter {
  private version?: any;
  public commands = new Command({});
  public pluginInstances: { [key: string]: any } = {};
  public _server?: FlyingSquidServerMock;
  public config: FlyingSquidConfig;

  constructor(config: CauldronConfig, public network: NetworkConnection) {
    super();

    debug("Initializing FlyingSquidWrapper");

    this.config = {
      "max-players": 10,
      "online-mode": false,
      logging: true,
      gameMode: 1,
      difficulty: 1,
      worldFolder: "world",
      generation: {
        name: "diamond_square",
        options: {
          worldHeight: 80,
        },
      },
      kickTimeout: 10000,
      plugins: {},
      modpe: false,
      "view-distance": 10,
      "player-list-text": {
        header: { text: "Flying squid" },
        footer: { text: "Test server" },
      },
      "everybody-op": true,
      "max-entities": 100,
      port: 25565,
      ...config,
    };

    this.setupServer();
  }

  async setupServer() {
    await this.ensureWorldFolderExists();
    this.version = await this.getVersionInfo();
    this._server = new FlyingSquidServerMock(this);

    this.checkIfVersionIsSupportedOrThrow();
    await this.setupPlugins();

    this._server.on("error", (error) => this.emit("error", error));
    this.emit("asap");
    this.emit("listening", this.config.port);
  }

  private ensureWorldFolderExists() {
    return new Promise<void>((resolve) => {
      fs.mkdir("world", {}, () => {
        resolve();
      });
    });
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
      this.pluginInstances[pluginName] = plugin;
      if (plugin.server) {
        plugin.server(this, this.config);
      }
    }
    debug("All plugins loaded");
  }

  public supportFeature(feature: any) {
    debug(`Supporting feature ${feature}`);

    // Fixes a problem in the portal plugin that tries to use a non-existent block
    if (feature === "theFlattening") return true;

    return supportFeature(feature, this.version.majorVersion);
  }
}
