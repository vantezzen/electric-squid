import { ServerClient } from "minecraft-protocol";
import CauldronFrontendServer from "../CauldronFrontendServer";
import EventHandler from "../EventHandler";

const debug = require("debug")("cauldron:ClientConnectedHandler");

export default class ClientConnectedHandler extends EventHandler {
  eventName = "client connected";

  handle(server: CauldronFrontendServer, client: ServerClient): void {
    server.clients.set(client.id, client);

    debug(`Client ${client.id} (${client.username}) connected`);

    this.writeLoginInfoPackageToNewClient(server, client);
    this.writePlayerListToAllClients(server);
    this.sendWelcomeMessageToAllClients(client, server);
  }

  private writeLoginInfoPackageToNewClient(
    server: CauldronFrontendServer,
    client: ServerClient
  ) {
    server.clientCommunication.sendTo(client.id, "login", {
      entityId: client.id,
      levelType: "default",
      gameMode: 1,
      dimension: 0,
      difficulty: 2,
      maxPlayers: 10,
      reducedDebugInfo: false,
    });
    server.clientCommunication.sendTo(client.id, "position", {
      x: 0,
      y: 100,
      z: 0,
      yaw: 137,
      pitch: 0,
      flags: 0x00,
    });
  }

  private writePlayerListToAllClients(server: CauldronFrontendServer) {
    server.clientCommunication.sendToAll("player_info", {
      action: 0,
      // @ts-ignore
      data: [...server.clients.values()].map((otherPlayer) => ({
        UUID: otherPlayer.uuid,
        name: otherPlayer.username,
        properties: [],
      })),
    });
  }

  private sendWelcomeMessageToAllClients(
    client: ServerClient,
    server: CauldronFrontendServer
  ) {
    const msg = {
      translate: "chat.type.announcement",
      with: ["CauldronJS", client.username + " joined the server."],
    };
    server.clientCommunication.sendToAll("chat", {
      message: JSON.stringify(msg),
      position: 0,
    });
  }
}
