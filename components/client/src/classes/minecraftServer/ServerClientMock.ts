import MinecraftProtocol from "minecraft-protocol";
import FlyingSquidWrapper from "./FlyingSquidWrapper";

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

    for (const item in clientData) {
      // @ts-ignore
      this[item] = clientData[item];
    }
  }

  public write(name: string, params: any) {
    this.wrapper.network.sendPackageToClient(this.id, name, params);
  }
}
