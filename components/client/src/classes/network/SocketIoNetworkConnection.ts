import SocketIo, { Socket } from "socket.io-client";
import EventEmitter from "events";
import debugging from "debug";
import CauldronClient from "../CauldronClient";
import { CauldronConfig } from "../minecraftServer/types";
const debug = debugging("cauldron:NetworkConnection");

export default class SocketIoNetworkConnection extends EventEmitter {
  socket: Socket;
  public ip?: string;

  constructor(
    serverAddress: string,
    private readonly config: CauldronConfig,
    private readonly client: CauldronClient
  ) {
    super();

    this.socket = SocketIo(serverAddress);
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.setupConnectionHandlers();
    this.setupGameEventHandlers();
  }

  private setupConnectionHandlers() {
    debug("Registering socket listeners");

    this.socket.on("connect", () => {
      debug("Connected to server");
    });

    this.socket.on("disconnect", () => {
      debug("Disconnected from server");
    });
  }

  public requestServerPort() {
    debug("Sending server port request");

    this.socket.emit(
      "create server",
      this.config.version,
      this.config.motd,
      (ip: string) => {
        debug(`Server created on ${ip}`);
        this.ip = ip;

        this.client.triggerUpdate();
      }
    );
  }

  private setupGameEventHandlers() {
    debug("Registering game event listeners");

    this.socket.on("game-event", (...data: any[]) => {
      debug("Received game event", data);
      this.emit("game-event", ...data);
    });
    this.socket.on("player-event", (...data: any[]) => {
      debug("Received player event", data);
      this.emit("player-event", ...data);
    });
  }

  sendPackageToClient(
    clientId: number,
    packageType: string,
    packageData: any
  ): void {
    debug(`Sending package to client ${clientId}`, packageType, packageData);
    this.socket.emit(
      "send minecraft package",
      clientId,
      packageType,
      packageData
    );
  }
}
