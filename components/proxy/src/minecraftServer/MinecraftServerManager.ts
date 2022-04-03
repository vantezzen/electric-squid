import MinecraftServer from "./MinecraftServer";

/**
 * Higher level management class for creating, managing and stopping
 * server instances
 */
export default interface MinecraftServerManager {
  createServerForFrontendClient(
    frontendClientId: string,
    version: string,
    motd: string
  ): number;
  getServerByFrontendClientId(
    frontendClientId: string
  ): MinecraftServer | undefined;
  sendPackageToClientOnServer(
    frontendClientId: string,
    clientId: number,
    packageType: string,
    data: any
  ): void;
  updateServerMotd(frontendClientId: string, motd: string): void;
  stopServerByFrontendClientId(frontendClientId: string): void;
  getAllServers(): MinecraftServer[];
  stopAllServers(): Promise<void>;
}
