import FrontendNetworkServer from "../frontendNetworking/FrontendNetworkServer";
import MinecraftServer from "./MinecraftServer";
import debugging from "debug";
const debug = debugging("squid:proxy:MinecraftServerFactory");

export default class MinecraftServerFactory {
  constructor(private frontendNetworkServer: FrontendNetworkServer) {}

  createMinecraftServer(
    frontendClientId: string,
    port: number,
    version: string,
    motd: string
  ): MinecraftServer {
    debug(
      `Creating server at port ${port} for version ${version} with MOTD ${motd}`
    );
    return new MinecraftServer(
      frontendClientId,
      this.frontendNetworkServer,
      port,
      version,
      motd
    );
  }
}
