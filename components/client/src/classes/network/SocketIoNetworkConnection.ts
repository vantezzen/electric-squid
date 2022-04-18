import NetworkConnection from "./NetworkConnection";
import SocketIo, { Socket } from "socket.io-client";
import EventEmitter from "events";
import { CauldronConfig } from "../minecraftServer/FlyingSquidWrapper";
import debugging from "debug";
const debug = debugging("cauldron:NetworkConnection");

export default class SocketIoNetworkConnection
  extends EventEmitter
  implements NetworkConnection
{
  socket: Socket;
  public ip?: string;

  constructor(serverAddress: string, private readonly config: CauldronConfig) {
    super();

    this.socket = SocketIo(serverAddress);
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.setupConnectionHandlers();
    this.requestServerPort();
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

  private requestServerPort() {
    debug("Sending server port request");

    this.socket.emit(
      "create server",
      this.config.version,
      this.config.motd,
      (ip: string) => {
        debug(`Server created on ${ip}`);
        this.ip = ip;
      }
    );
  }

  private setupGameEventHandlers() {
    debug("Registering game event listeners");

    this.socket.on("game-event", (...data: any[]) => {
      debug("Received game event");
      this.emit("game-event", ...data);
    });
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
