import FrontendNetworkServer from "./frontendNetworking/FrontendNetworkServer";
import SocketIoFrontendNetworkServer from "./frontendNetworking/SocketIoFrontendNetworkServer";
import CauldronMinecraftServerFactory from "./minecraftServer/CauldronMinecraftServerFactory";
import CauldronMinecraftServerManager from "./minecraftServer/CauldronMinecraftServerManager";
import MinecraftServerFactory from "./minecraftServer/MinecraftServerFactory";
import MinecraftServerManager from "./minecraftServer/MinecraftServerManager";

export default class CauldronProxy {
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
      serverFactory ??
      new CauldronMinecraftServerFactory(this.frontendNetworkServer);

    this.minecraftServerManager =
      minecraftServerManager ??
      new CauldronMinecraftServerManager(this.serverFactory);

    this.frontendNetworkServer.setServerManager(this.minecraftServerManager);
  }

  public start(): void {
    this.frontendNetworkServer.start();
  }
}
