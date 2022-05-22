import FlyingSquidWrapper from "./minecraftServer/FlyingSquidWrapper";
import SocketIoNetworkConnection from "./network/SocketIoNetworkConnection";
import debugging from "debug";
import EventEmitter from "events";
import { SquidConfig } from "./minecraftServer/types";
const debug = debugging("squid:SquidClient");

/**
 * electric-squid frontend client
 * Sets up the server and the network connection to get the server up and running
 */
export default class SquidClient extends EventEmitter {
  minecraftServer: FlyingSquidWrapper;
  networkConnection: SocketIoNetworkConnection;

  static instance?: SquidClient;

  constructor(serverAddress: string, config: SquidConfig) {
    super();

    debug("Setting up...");

    this.networkConnection = new SocketIoNetworkConnection(
      serverAddress,
      config,
      this
    );

    this.minecraftServer = new FlyingSquidWrapper(
      config,
      this.networkConnection,
      this
    );
  }

  async setupServer() {
    this.networkConnection.requestServerPort();
    await this.minecraftServer.setupServer();
    this.triggerUpdate();
  }

  static setupOrGetInstance(serverAddress: string, config: SquidConfig) {
    if (!this.instance) {
      this.instance = new SquidClient(serverAddress, config);
    }

    return this.instance;
  }

  triggerUpdate() {
    this.emit("update");
  }
}
