import { ServerClient } from "minecraft-protocol";
import CauldronFrontendServer from "./CauldronFrontendServer";

export default abstract class EventHandler {
  abstract eventName: string;
  abstract handle(
    server: CauldronFrontendServer,
    client: ServerClient,
    ...packageData: any[]
  ): void;
}
