import MinecraftProtocol from "minecraft-protocol";
import FrontendNetworkServer from "../frontendNetworking/FrontendNetworkServer";
import MinecraftServer from "./MinecraftServer";

export default class CauldronMinecraftServer implements MinecraftServer {
  private server: MinecraftProtocol.Server;
  private clients = new Map<number, MinecraftProtocol.ServerClient>();

  constructor(
    private readonly frontendClientId: string,
    private readonly frontendNetworkServer: FrontendNetworkServer,
    private readonly port: number = 3000,
    version: string = "1.18.2",
    motd: string = "A cauldron server"
  ) {
    this.server = MinecraftProtocol.createServer({
      "online-mode": false,
      port,
      version,
      motd,
    });

    this.setupMinecraftEventListeners();
  }

  getPort(): number {
    return this.port;
  }

  async stop(): Promise<void> {
    this.disconnectAllClients();
    this.server.close();
  }

  private disconnectAllClients() {
    this.clients.forEach((client) => {
      client.end("Server shutting down");
    });
  }

  private setupMinecraftEventListeners() {
    this.server.on("login", this.handleLogin);
  }

  private handleLogin(client: MinecraftProtocol.ServerClient) {
    this.clients.set(client.id, client);

    this.sendLoginInfoMessageToFrontend(client);
    client.on("packet", this.getPacketHandlerForClient(client));
    client.on("end", this.getLogoutHandlerForClient(client));
  }

  private sendLoginInfoMessageToFrontend(
    client: MinecraftProtocol.ServerClient
  ) {
    this.sendMessageToFrontend("client connected", client);
  }

  private sendMessageToFrontend(messageKey: string, ...messageData: any[]) {
    this.frontendNetworkServer.sendMessageToClient(
      this.frontendClientId,
      messageKey,
      ...messageData
    );
  }

  private getPacketHandlerForClient(client: MinecraftProtocol.ServerClient) {
    return (data: any, packetMeta: MinecraftProtocol.PacketMeta) => {
      if (packetMeta.name) {
        this.sendMessageToFrontend("client packet", client, data, packetMeta);
      }
    };
  }

  private getLogoutHandlerForClient(client: MinecraftProtocol.ServerClient) {
    return (reason: string) => {
      this.sendMessageToFrontend("client disconnected", client, reason);
    };
  }

  sendPackageToClient(
    clientId: number,
    packageType: string,
    contents: any
  ): void {
    const client = this.clients.get(clientId);
    if (!client) {
      throw new Error(`Client with id ${clientId} not found`);
    }

    client.write(packageType, contents);
  }

  updateMotd(motd: string): void {
    this.server.motd = motd;
  }
}
