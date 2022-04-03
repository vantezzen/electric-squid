import FrontendNetworkServer from "../frontendNetworking/FrontendNetworkServer";
import CauldronMinecraftServer from "./CauldronMinecraftServer";
import MinecraftServer from "./MinecraftServer";
import MinecraftServerManager from "./MinecraftServerManager";
import MinecraftServerFactory from "./MinecraftServerFactory";

export default class CauldronMinecraftServerFactory
  implements MinecraftServerFactory
{
  constructor(private frontendNetworkServer: FrontendNetworkServer) {}

  createMinecraftServer(
    frontendClientId: string,
    port: number,
    version: string,
    motd: string
  ): MinecraftServer {
    return new CauldronMinecraftServer(
      frontendClientId,
      this.frontendNetworkServer,
      port,
      version,
      motd
    );
  }
}
