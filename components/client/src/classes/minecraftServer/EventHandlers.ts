import { ServerClient } from "minecraft-protocol";
import socketEventHandlers from "./socketEventHandlers";
import EventHandler from "./EventHandler";
import packageEventHandlers from "./packageEventHandlers";
import CauldronFrontendServer from "./CauldronFrontendServer";
const debug = require("debug")("cauldron:CauldronFrontendServer");

export default class EventHandlers {
  private socketEventHandlers: Map<string, EventHandler> = new Map();
  private packageEventHandlers: Map<string, EventHandler> = new Map();

  constructor(private server: CauldronFrontendServer) {
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.registerEventHandlerArray("socket", socketEventHandlers);
    this.registerEventHandlerArray("package", packageEventHandlers);
  }

  private registerEventHandlerArray(
    type: "socket" | "package",
    eventHandlers: EventHandler[]
  ) {
    for (const eventHandler of eventHandlers) {
      this.registerEventHandler(type, eventHandler);
    }
  }

  private registerEventHandler(
    type: "socket" | "package",
    eventHandler: EventHandler
  ) {
    this[`${type}EventHandlers`].set(eventHandler.eventName, eventHandler);
  }

  public handleSocketEvent(
    eventName: string,
    client: ServerClient,
    ...packageData: any[]
  ) {
    debug(`Handling event ${eventName}`);
    const eventHandler = this.socketEventHandlers.get(eventName);

    if (eventHandler) {
      eventHandler.handle(this.server, client, ...packageData);
    } else {
      debug(`No event handler for event ${eventName}`);
    }
  }
}
