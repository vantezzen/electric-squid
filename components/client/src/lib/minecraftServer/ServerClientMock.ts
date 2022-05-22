import MinecraftProtocol from "minecraft-protocol";
import FlyingSquidWrapper from "./FlyingSquidWrapper";
import debugging from "debug";
import { EXTENDED_DEBUGGING, shouldDebugPacket } from "../../config";
const debug = debugging("squid:ServerClientMock");

export default class ServerClientMock extends MinecraftProtocol.Client {
  // @ts-ignore
  socket = {
    listeners: () => [1],
    remoteAddress: "by proxy",
  };
  public id: number = -1;

  constructor(
    version: string,
    clientData: { [key: string]: any },
    private wrapper: FlyingSquidWrapper
  ) {
    super(true, version);

    if (EXTENDED_DEBUGGING) {
      debug("Initializing ServerClientMock", clientData);
    }

    for (const item in clientData) {
      // @ts-ignore
      this[item] = clientData[item];
    }
  }

  public write(name: string, params: any) {
    if (shouldDebugPacket(name)) {
      debug("Writing to client", name, params);
    }

    this.wrapper.network.sendPackageToClient(this.id, name, params);
  }

  public writeChannel(...args: any[]) {
    debug("Writing to client channel (ignored)", args);
  }
  public registerChannel(...args: any[]) {
    debug("Registering channel (ignored)", args);
  }
}
