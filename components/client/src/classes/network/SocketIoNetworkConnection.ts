import SocketIo, { Socket } from "socket.io-client";
import EventEmitter from "events";
import debugging from "debug";
import SquidClient from "../SquidClient";
import { SquidConfig } from "../minecraftServer/types";
import { EXTENDED_DEBUGGING, shouldDebugPacket } from "../../config";
const debug = debugging("squid:NetworkConnection");

export default class SocketIoNetworkConnection extends EventEmitter {
  socket: Socket;
  public ip?: string;

  constructor(
    serverAddress: string,
    private readonly config: SquidConfig,
    private readonly client: SquidClient
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
      if (EXTENDED_DEBUGGING) {
        debug("Received game event", data);
      }

      this.emit("game-event", ...data);
    });
    this.socket.on("player-event", (...data: any[]) => {
      if (EXTENDED_DEBUGGING) {
        debug("Received player event", data);
      }

      this.emit("player-event", ...data);
    });
  }

  sendPackageToClient(
    clientId: number,
    packageType: string,
    packageData: any
  ): void {
    if (shouldDebugPacket(packageType)) {
      debug(`Sending package to client ${clientId}`, packageType, packageData);
    }

    this.socket.emit(
      "send minecraft package",
      clientId,
      packageType,
      packageData
    );
  }
}
