import FlyingSquidWrapper from "./minecraftServer/FlyingSquidWrapper";
import SocketIoNetworkConnection from "./network/SocketIoNetworkConnection";
import debugging from "debug";
import EventEmitter from "events";
import { CauldronConfig } from "./minecraftServer/types";
const debug = debugging("cauldron:CauldronClient");

/**
 * Cauldron frontend client
 * Sets up the server and the network connection to get the server up and running
 */
export default class CauldronClient extends EventEmitter {
  minecraftServer: FlyingSquidWrapper;
  networkConnection: SocketIoNetworkConnection;

  static instance?: CauldronClient;

  constructor(serverAddress: string, config: CauldronConfig) {
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

  static setupOrGetInstance(serverAddress: string, config: CauldronConfig) {
    if (!this.instance) {
      this.instance = new CauldronClient(serverAddress, config);
    }

    return this.instance;
  }

  triggerUpdate() {
    this.emit("update");
  }
}
