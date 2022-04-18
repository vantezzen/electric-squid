import FrontendNetworkServer from "../frontendNetworking/FrontendNetworkServer";
import MinecraftServer from "./MinecraftServer";

export default class MinecraftServerFactory {
  constructor(private frontendNetworkServer: FrontendNetworkServer) {}

  createMinecraftServer(
    frontendClientId: string,
    port: number,
    version: string,
    motd: string
  ): MinecraftServer {
    return new MinecraftServer(
      frontendClientId,
      this.frontendNetworkServer,
      port,
      version,
      motd
    );
  }
}
