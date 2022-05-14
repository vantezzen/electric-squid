import FrontendNetworkServer from "./frontendNetworking/FrontendNetworkServer";
import SocketIoFrontendNetworkServer from "./frontendNetworking/SocketIoFrontendNetworkServer";
import MinecraftServerFactory from "./minecraftServer/MinecraftServerFactory";
import MinecraftServerManager from "./minecraftServer/MinecraftServerManager";

export default class SquidProxy {
  private readonly frontendNetworkServer: FrontendNetworkServer;
  private readonly serverFactory: MinecraftServerFactory;
  private readonly minecraftServerManager: MinecraftServerManager;

  constructor(
    frontendNetworkServer?: FrontendNetworkServer,
    serverFactory?: MinecraftServerFactory,
    minecraftServerManager?: MinecraftServerManager
  ) {
    this.frontendNetworkServer =
      frontendNetworkServer ?? new SocketIoFrontendNetworkServer();

    this.serverFactory =
      serverFactory ?? new MinecraftServerFactory(this.frontendNetworkServer);

    this.minecraftServerManager =
      minecraftServerManager ?? new MinecraftServerManager(this.serverFactory);

    this.frontendNetworkServer.setServerManager(this.minecraftServerManager);
  }

  public start(): void {
    this.frontendNetworkServer.start();
  }
}
