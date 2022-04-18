import MinecraftServer from "./MinecraftServer";
import MinecraftServerFactory from "./MinecraftServerFactory";

const LOWEST_PORT = 25000;

export default class MinecraftServerManager {
  private servers: { [key: string]: MinecraftServer } = {};
  private nextPort = LOWEST_PORT;
  private freedPorts: number[] = [];

  constructor(private minecraftServerFactory: MinecraftServerFactory) {}

  createServerForFrontendClient(
    frontendClientId: string,
    version: string,
    motd: string
  ): number {
    const port = this.getNextAvailablePort();

    const server = this.minecraftServerFactory.createMinecraftServer(
      frontendClientId,
      port,
      version,
      motd
    );

    this.storeServer(server, frontendClientId);

    return port;
  }

  private storeServer(server: MinecraftServer, key: string): void {
    if (this.servers[key]) {
      throw new Error(`Server with key ${key} already exists`);
    }

    this.servers[key] = server;
  }

  private getNextAvailablePort(): number {
    if (this.freedPorts.length > 0) {
      return this.freedPorts.pop()!;
    }

    return this.nextPort++;
  }

  getServerByFrontendClientId(
    frontendClientId: string
  ): MinecraftServer | undefined {
    return this.servers[frontendClientId];
  }

  sendPackageToClientOnServer(
    frontendClientId: string,
    clientId: number,
    packageType: string,
    data: any
  ): void {
    const server = this.getServerByFrontendClientId(frontendClientId);

    if (!server) {
      throw new Error(
        `Server with frontend client id ${frontendClientId} not found`
      );
    }

    server.sendPackageToClient(clientId, packageType, data);
  }

  updateServerMotd(frontendClientId: string, motd: string): void {
    const server = this.getServerByFrontendClientId(frontendClientId);

    if (!server) {
      throw new Error(
        `Server with frontend client id ${frontendClientId} not found`
      );
    }

    server.updateMotd(motd);
  }

  getAllServers(): MinecraftServer[] {
    return Object.values(this.servers);
  }

  stopServerByFrontendClientId(frontendClientId: string): void {
    const server = this.getServerByFrontendClientId(frontendClientId);

    if (!server) {
      throw new Error(
        `Server with frontend client id ${frontendClientId} not found`
      );
    }

    const port = server.getPort();
    this.freedPorts.push(port);

    server.stop();
    delete this.servers[frontendClientId];
  }

  async stopAllServers(): Promise<void> {
    await Promise.all(this.getAllServers().map((server) => server.stop()));
    this.servers = {};
    this.nextPort = LOWEST_PORT;
  }
}
