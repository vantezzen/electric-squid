import EventEmitter from "events";
import FlyingSquidWrapper from "./FlyingSquidWrapper";
import debugging from "debug";
const debug = debugging("cauldron:FlyingSquidServerMock");

/**
 * Mock of the minecraft-protocol server (https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/src/server.js)
 * to use the proxy instead of hosting a server directly
 */
export default class FlyingSquidServerMock extends EventEmitter {
  constructor(private wrapper: FlyingSquidWrapper) {
    super();

    this.wrapper.network.on(
      "game-event",
      (eventName: string, ...data: any[]) => {
        debug(`Received game event: ${eventName}`, data);
        this.emit(eventName, ...data);
      }
    );
  }
}
