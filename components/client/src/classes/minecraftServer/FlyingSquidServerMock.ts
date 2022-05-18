import EventEmitter from "events";
import MinecraftProtocol from "minecraft-protocol";
import FlyingSquidWrapper from "./FlyingSquidWrapper";
import debugging from "debug";
import ServerClientMock from "./ServerClientMock";
import { Player } from "./types";
import { EXTENDED_DEBUGGING, shouldDebugPacket } from "../../config";
const debug = debugging("squid:FlyingSquidServerMock");

/**
 * Mock of the minecraft-protocol server (https://github.com/PrismarineJS/node-minecraft-protocol/blob/master/src/server.js)
 * to use the proxy instead of hosting a server directly
 */
export default class FlyingSquidServerMock extends EventEmitter {
  constructor(private wrapper: FlyingSquidWrapper) {
    super();
    this.setupNetworkEventListeners();
  }

  private setupNetworkEventListeners() {
    this.wrapper.network.on(
      "game-event",
      (eventName: string, ...data: any[]) => {
        if (shouldDebugPacket(eventName)) {
          debug(`Received game event: ${eventName}`, data);
        }

        this.emit(eventName, ...this.decodeMessageData(data));
      }
    );
    this.wrapper.network.on("player-event", this.handlePlayerEvent.bind(this));
  }

  private handlePlayerEvent(eventName: string, ...data: any[]) {
    const packetData = this.decodeMessageData(data);
    const playerEntity = this.findPlayerByUuid(data[0].uuid);
    if (playerEntity) {
      const packetName = data[2]?.name;
      if (shouldDebugPacket(packetName)) {
        debug(
          `Emitting player event ${packetName} (of event ${eventName}) to player ${playerEntity.username}`,
          packetData
        );
      }

      playerEntity._client.emit(eventName, ...packetData.slice(1));
    } else {
      debug(`Could not find player with id ${data[0].uuid}`);
    }
  }

  private findPlayerByUuid(uuid: string): Player | undefined {
    return this.wrapper.players.find((player) => player.uuid === uuid);
  }

  private decodeMessageData(messageData: any[]) {
    const finalMessageData = [];
    for (const dataItem of messageData) {
      if (typeof dataItem === "object" && "SQUID_TYPE" in dataItem) {
        if (EXTENDED_DEBUGGING) {
          debug("Creating mock item for server client", dataItem);
        }

        const player = new ServerClientMock(
          this.wrapper.config.version,
          dataItem,
          this.wrapper
        );
        finalMessageData.push(player);
      } else {
        finalMessageData.push(dataItem);
      }
    }
    return finalMessageData;
  }
}
