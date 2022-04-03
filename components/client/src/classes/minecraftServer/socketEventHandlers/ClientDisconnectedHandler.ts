import { ServerClient } from "minecraft-protocol";
import CauldronFrontendServer from "../CauldronFrontendServer";
import EventHandler from "../EventHandler";

export default class ClientDisconnectedHandler extends EventHandler {
  eventName = "client disconnected";

  handle(server: CauldronFrontendServer, client: ServerClient): void {
    server.clients.delete(client.id);
  }
}
