import Express from "express";
import Http from "http";
import { Server as SocketIoServer, Socket } from "socket.io";
import MinecraftServerManager from "../minecraftServer/MinecraftServerManager";

import FrontendNetworkServer from "./FrontendNetworkServer";

const debug = require("debug")("cauldron:proxy:FrontendNetworkServer");

export default class SocketIoFrontendNetworkServer
  implements FrontendNetworkServer
{
  private express?: Express.Express;
  private httpServer?: Http.Server;
  private socketIoServer?: SocketIoServer;
  private serverManager?: MinecraftServerManager;

  constructor(
    private port: number = 3000,
    private hostname: string = "localhost"
  ) {
    debug("Creating new socket.io frontend network server");
  }

  setServerManager(serverManager: MinecraftServerManager): void {
    this.serverManager = serverManager;
  }

  start(): void {
    this.setupExpressServer();
    this.setupSocketIoServer();
  }

  private setupExpressServer() {
    this.express = Express();
    this.httpServer = Http.createServer(this.express);
    this.httpServer.listen(this.port, function () {
      console.log(`Webserver listening on port ${this.port}`);
    });
  }

  private setupSocketIoServer() {
    if (!this.httpServer) {
      throw new Error("Cannot start socket.io server without http server");
    }

    this.socketIoServer = new SocketIoServer(this.httpServer, {
      cookie: false,
    });
    this.socketIoServer.on("connection", this.handleSocketConnection);
  }

  sendMessageToClient(
    clientId: string,
    messageKey: string,
    ...messageData: any[]
  ): void {
    if (!this.socketIoServer) {
      throw new Error("Cannot send message to client without socket.io server");
    }

    this.socketIoServer.to(clientId).emit(messageKey, ...messageData);
  }

  private handleSocketConnection(socket: Socket) {
    debug("New socket connection");

    socket.on(
      "create server",
      this.getSocketCreateServerRequestHandlerForClient(socket)
    );
    socket.on(
      "send minecraft package",
      this.getSendMinecraftPackageHandlerForClient(socket)
    );
    socket.on("stop server", this.getStopServerHandlerForClient(socket));
    socket.on("disconnect", this.getStopServerHandlerForClient(socket));
  }

  private getSocketCreateServerRequestHandlerForClient(socket: Socket) {
    return (version: string, motd: string, callback: (ip: string) => void) => {
      const port = this.serverManager!.createServerForFrontendClient(
        socket.id,
        version,
        motd
      );
      callback(`${this.hostname}:${port}`);
    };
  }

  private getSendMinecraftPackageHandlerForClient(socket: Socket) {
    return (clientId: number, packageType: string, packageData: any) => {
      this.serverManager!.sendPackageToClientOnServer(
        socket.id,
        clientId,
        packageType,
        packageData
      );
    };
  }

  private getStopServerHandlerForClient(socket: Socket) {
    return () => {
      try {
        this.serverManager!.stopServerByFrontendClientId(socket.id);
      } catch (error) {
        debug(error);
      }
    };
  }
}
