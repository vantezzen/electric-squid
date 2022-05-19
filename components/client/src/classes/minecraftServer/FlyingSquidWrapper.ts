import supportFeature from "flying-squid/src/lib/supportFeature";
import Command from "flying-squid/src/lib/command";
import fs from "fs";
import EventEmitter from "events";

// import buildInPlugins from "./buildInPlugins";
import FlyingSquidServerMock from "./FlyingSquidServerMock";
import debugging from "debug";
import SquidClient from "../SquidClient";
import SocketIoNetworkConnection from "../network/SocketIoNetworkConnection";
import Logger from "./Logger";
import { SquidConfig, FlyingSquidConfig, Player } from "./types";
import { EXTENDED_DEBUGGING } from "../../config";
const debug = debugging("squid:FlyingSquidServerMock");

const buildInPlugins = {
  test: () => ({
    server: () => {},
  }),
};

/**
 * Replacement for the flying squid initializer (https://github.com/PrismarineJS/flying-squid/blob/master/src/index.js)
 */
export default class FlyingSquidWrapper extends EventEmitter {
  public version?: any;
  public commands = new Command({});
  public pluginInstances: { [key: string]: any } = {};
  public _server?: FlyingSquidServerMock;
  public config: FlyingSquidConfig;
  public logger: Logger;

  public status = "Not set up yet";
  public isSetUp = false;
  public isSettingUp = false;
  public players: Player[] = [];

  constructor(
    config: SquidConfig,
    public network: SocketIoNetworkConnection,
    private readonly client: SquidClient
  ) {
    super();

    this.logger = new Logger(client);

    debug("Initializing FlyingSquidWrapper");

    this.config = this.getDefaultConfig(config);
  }

  private getDefaultConfig(overrides: Partial<SquidConfig>): FlyingSquidConfig {
    return {
      "max-players": 10,
      "online-mode": false,
      logging: true,
      gameMode: 1,
      difficulty: 1,
      worldFolder: "world",
      generation: {
        name: overrides.worldGeneration ?? "diamond_square",
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
      ...overrides,
    };
  }

  async setupServer() {
    this.isSettingUp = true;
    this.setStatus("Setting up server...");

    this.addLogMessagesToLogger();

    await this.ensureWorldFolderExists();
    this.version = await this.getVersionInfo();
    this._server = new FlyingSquidServerMock(this);

    await this.setupPlugins();
    this.setupEventSystem();

    this.sendSetupCompleteSignals();
  }

  private sendSetupCompleteSignals() {
    this.isSetUp = true;
    this.isSettingUp = false;
    this.setStatus("Setup done");
  }

  private setupEventSystem() {
    this._server!.on("error", (error) => this.emit("error", error));
    this.emit("asap");
    this.emit("listening", this.config.port);
  }

  private addLogMessagesToLogger() {
    this.on("log", (message) => {
      this.logger.addLogMessage(message);
    });
  }

  private ensureWorldFolderExists() {
    return new Promise<void>((resolve) => {
      fs.mkdir("world", {}, () => {
        resolve();
      });
    });
  }

  private async getVersionInfo() {
    // Currently always using 1.16 version infos as they are compatible with older versions too
    return import(`minecraft-data/minecraft-data/data/pc/1.16/version.json`);
  }

  private async setupPlugins() {
    for (const pluginNameString in buildInPlugins) {
      await this.setupPlugin(pluginNameString as keyof typeof buildInPlugins);
    }
    debug("All plugins loaded");
    this.setStatus("All plugins loaded");
  }

  private async setupPlugin(pluginName: keyof typeof buildInPlugins) {
    const loadPluginFunction = buildInPlugins[pluginName];
    debug(`Loading plugin "${pluginName}"`);
    this.setStatus(`Loading plugin "${pluginName}"`);

    const plugin = await loadPluginFunction();
    this.pluginInstances[pluginName] = plugin;
    if (plugin.server) {
      // @ts-ignore
      plugin.server(this, this.config);
    }
  }

  public supportFeature(feature: any) {
    if (EXTENDED_DEBUGGING) {
      debug(`Checking if feature "${feature}" is supported`);
    }

    return supportFeature(feature, this.version.majorVersion);
  }

  public setStatus(status: string) {
    this.status = status;
    this.client.triggerUpdate();
  }
}
