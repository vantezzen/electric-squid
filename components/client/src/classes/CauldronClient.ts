import FlyingSquidWrapper, {
  CauldronConfig,
} from "./minecraftServer/FlyingSquidWrapper";
import NetworkConnection from "./network/NetworkConnection";
import SocketIoNetworkConnection from "./network/SocketIoNetworkConnection";
import debugging from "debug";
const debug = debugging("cauldron:CauldronClient");

/**
 * Cauldron frontend client
 * Sets up the server and the network connection to get the server up and running
 */
export default class CauldronClient {
  minecraftServer: FlyingSquidWrapper;
  networkConnection: NetworkConnection;

  static instance = new CauldronClient(":3005", {
    version: "1.13.2",
    motd: "Hello",
  });

  constructor(serverAddress: string, config: CauldronConfig) {
    debug("Setting up...");

    this.networkConnection = new SocketIoNetworkConnection(
      serverAddress,
      config
    );

    this.minecraftServer = new FlyingSquidWrapper(
      config,
      this.networkConnection
    );
  }
}
