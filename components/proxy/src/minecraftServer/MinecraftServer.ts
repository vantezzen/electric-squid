import MinecraftProtocol from "minecraft-protocol";
import FrontendNetworkServer from "../frontendNetworking/FrontendNetworkServer";
import debugging from "debug";
const debug = debugging("squid:MinecraftServer");

export default class MinecraftServer {
  private server: MinecraftProtocol.Server;
  private clients = new Map<number, MinecraftProtocol.ServerClient>();

  constructor(
    private readonly frontendClientId: string,
    private readonly frontendNetworkServer: FrontendNetworkServer,
    private readonly port: number = 3000,
    version: string = "1.13.2",
    motd: string = "An electric-squid server"
  ) {
    debug(`Setting up on port ${port} with version ${version}`);

    this.handleLogin = this.handleLogin.bind(this);

    this.server = MinecraftProtocol.createServer({
      "online-mode": false,
      port,
      version,
      motd,
    });

    this.setupMinecraftEventListeners();

    debug("Init done");
  }

  getPort(): number {
    return this.port;
  }

  async stop(): Promise<void> {
    debug("Stopping server");

    this.disconnectAllClients();
    this.server.close();
  }

  private disconnectAllClients() {
    this.clients.forEach((client) => {
      client.end("Server shutting down");
    });
  }

  private setupMinecraftEventListeners() {
    for (const event of ["login", "connection"]) {
      // @ts-ignore
      this.server.on(event, this.sendGameEventToFrontend(event));
    }

    this.server.on("login", this.handleLogin);
  }

  private sendGameEventToFrontend(eventName: string) {
    return (...eventData: any[]) => {
      debug("Sending game event to frontend", eventName, eventData);
      this.sendMessageToFrontend("game-event", eventName, ...eventData);
    };
  }

  private handleLogin(client: MinecraftProtocol.ServerClient) {
    debug(
      `New player "${client.username}" connected to server on port ${this.port}`
    );
    this.clients.set(client.id, client);

    for (const event of [
      "packet",
      "end",
      "look",
      "position_look",
      "tab_complete",
      "held_item_slot",
      "close_window",
      "arm_animation",
      "entity_action",
      "client_command",
      "chat",
      "settings",
      "use_entity",
      "block_place",
    ]) {
      client.on(event, this.sendPlayerEventToFrontend(event, client));
    }

    client.on("error", (error) => {
      debug(`A client on port ${this.port} reported an error:`, error);
    });
  }

  private sendPlayerEventToFrontend(
    eventName: string,
    client: MinecraftProtocol.ServerClient
  ) {
    return (...eventData: any[]) => {
      debug(
        "Sending player event to frontend",
        eventName,
        client.username,
        eventData
      );

      this.sendMessageToFrontend(
        "player-event",
        eventName,
        client,
        ...eventData
      );
    };
  }

  private sendMessageToFrontend(messageKey: string, ...messageData: any[]) {
    this.frontendNetworkServer.sendMessageToClient(
      this.frontendClientId,
      messageKey,
      ...this.prepareMessageData(messageData)
    );
  }

  private prepareMessageData(messageData: any[]) {
    const finalMessageData = [];
    for (const dataItem of messageData) {
      if (typeof dataItem === "object" && "protocolState" in dataItem) {
        const player = dataItem as MinecraftProtocol.ServerClient;
        finalMessageData.push({
          SQUID_TYPE: "player",
          id: player.id,
          uuid: player.uuid,
          username: player.username,
          state: player.state,
        });
      } else {
        finalMessageData.push(dataItem);
      }
    }
    return finalMessageData;
  }

  sendPackageToClient(
    clientId: number,
    packageType: string,
    contents: any
  ): void {
    debug(`Sending package of type "${packageType}" to client ID ${clientId}`);

    const client = this.clients.get(clientId);
    if (!client) {
      throw new Error(`Client with id ${clientId} not found`);
    }

    client.write(packageType, contents);
    debug("Package sent to client successful");
  }

  updateMotd(motd: string): void {
    debug(`Updating MOTD to ${motd} for server on port ${this.port}`);
    this.server.motd = motd;
  }
}
