import NetworkConnection from "./NetworkConnection";
import SocketIo, { Socket } from "socket.io-client";
import CauldronFrontendServer from "../minecraftServer/CauldronFrontendServer";
import eventHandlers from "../minecraftServer/socketEventHandlers";
import { ServerClient } from "minecraft-protocol";

const debug = require("debug")("cauldron:NetworkConnection");

export default class SocketIoNetworkConnection implements NetworkConnection {
  socket: Socket;

  constructor(
    serverAddress: string,
    private readonly minecraftServer: CauldronFrontendServer
  ) {
    this.socket = SocketIo(serverAddress);
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.setupConnectionHandlers();
    this.setupGameEventHandlers();
  }

  private setupConnectionHandlers() {
    this.socket.on("connect", () => {
      debug("Connected to server");
    });

    this.socket.on("disconnect", () => {
      debug("Disconnected from server");
    });
  }

  private setupGameEventHandlers() {
    for (const eventHandler of eventHandlers) {
      this.socket.on(
        eventHandler.eventName,
        (client: ServerClient, ...packageData: any[]) => {
          debug(
            `Handling event ${eventHandler.eventName}`,
            client,
            packageData
          );

          this.minecraftServer.eventHandlers.handleSocketEvent(
            eventHandler.eventName,
            client,
            ...packageData
          );
        }
      );
    }
  }

  sendPackageToClient(
    clientId: number,
    packageType: string,
    packageData: any
  ): void {
    debug(`Sending package to client ${clientId}`);
    this.socket.emit(
      "send minecraft package",
      clientId,
      packageType,
      packageData
    );
  }
}
