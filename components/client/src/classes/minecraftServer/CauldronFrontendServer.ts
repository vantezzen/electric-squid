import { ServerClient } from "minecraft-protocol";
import NetworkConnection from "../network/NetworkConnection";
import ClientCommunication from "./ClientCommunication";
import EventHandlers from "./EventHandlers";
const debug = require("debug")("cauldron:CauldronFrontendServer");

export type CauldronConfig = {
  version: string;
  motd: string;
  port: number;
};

/**
 * The Cauldron frontend server.
 * Deligates all work into their respective subclasses
 */
export default class CauldronFrontendServer {
  public clients: Map<number, ServerClient> = new Map();
  public networkConnection?: NetworkConnection;

  public clientCommunication = new ClientCommunication(this);
  public eventHandlers = new EventHandlers(this);

  constructor(public config: CauldronConfig) {}

  public setNetworkConnection(networkConnection: NetworkConnection) {
    this.networkConnection = networkConnection;
  }
}
