import MinecraftServer from "./MinecraftServer";

/**
 * Server factory for creating new Servers for frontend clients
 */
export default interface MinecraftServerFactory {
  createMinecraftServer(
    frontendClientId: string,
    port: number,
    version: string,
    motd: string
  ): MinecraftServer;
}
