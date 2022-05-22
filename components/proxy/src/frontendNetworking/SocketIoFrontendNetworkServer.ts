import Express from "express";
import Http from "http";
import path from "path";
import { Server as SocketIoServer, Socket } from "socket.io";
import MinecraftServerManager from "../minecraftServer/MinecraftServerManager";

import FrontendNetworkServer from "./FrontendNetworkServer";

const debug = require("debug")("squid:proxy:FrontendNetworkServer");

export default class SocketIoFrontendNetworkServer
  implements FrontendNetworkServer
{
  private express?: Express.Express;
  private httpServer?: Http.Server;
  private socketIoServer?: SocketIoServer;
  private serverManager?: MinecraftServerManager;

  constructor(
    private port: number = Number(process.env.PORT!),
    private hostname: string = process.env.HOSTNAME!
  ) {
    debug("Creating new socket.io frontend network server");

    this.handleSocketConnection = this.handleSocketConnection.bind(this);
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

    if (process.env.HOST_FRONTEND == "true") {
      const frontendPath = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "client",
        "build"
      );
      console.log("Hosting frontend from", frontendPath);

      this.express.use(Express.static(frontendPath));
    }

    this.httpServer = Http.createServer(this.express);
    this.httpServer.listen(this.port, () => {
      console.log(`Webserver listening on port ${this.port}`);
    });
  }

  private setupSocketIoServer() {
    if (!this.httpServer) {
      throw new Error("Cannot start socket.io server without http server");
    }

    this.socketIoServer = new SocketIoServer(this.httpServer, {
      cookie: false,
      cors: {
        origin: "*",
      },
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

    debug("Sending message to client", messageKey, messageData);
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
      debug(
        `Sending package from frontend to minecraft client of type ${packageType}`
      );

      try {
        this.serverManager!.sendPackageToClientOnServer(
          socket.id,
          clientId,
          packageType,
          packageData
        );
      } catch (e) {
        debug("Could not send package:", e);
      }
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
