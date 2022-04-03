import CauldronFrontendServer from "./minecraftServer/CauldronFrontendServer";
import NetworkConnection from "./network/NetworkConnection";
import SocketIoNetworkConnection from "./network/SocketIoNetworkConnection";

/**
 * Cauldron frontend client
 * Sets up the server and the network connection to get the server up and running
 */
export default class CauldronClient {
  frontendServer: CauldronFrontendServer;
  networkConnection: NetworkConnection;

  constructor(serverAddress: string) {
    this.frontendServer = new CauldronFrontendServer();
    this.networkConnection = new SocketIoNetworkConnection(
      serverAddress,
      this.frontendServer
    );
    this.frontendServer.setNetworkConnection(this.networkConnection);
  }
}
