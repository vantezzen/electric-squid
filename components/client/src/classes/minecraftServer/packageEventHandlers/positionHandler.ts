import { ServerClient } from "minecraft-protocol";
import CauldronFrontendServer from "../CauldronFrontendServer";
import EventHandler from "../EventHandler";

export default class PositionHandler extends EventHandler {
  eventName = "position";

  handle(server: CauldronFrontendServer, client: ServerClient): void {}
}
