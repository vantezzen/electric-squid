import CauldronFrontendServer from "./CauldronFrontendServer";

export default class ClientCommunication {
  constructor(private readonly server: CauldronFrontendServer) {}

  sendTo(clientId: number, packageType: string, data: any) {
    this.server.networkConnection!.sendPackageToClient(
      clientId,
      packageType,
      data
    );
  }

  sendToAll(packageType: string, data: any) {
    this.server.clients.forEach((client) => {
      this.sendTo(client.id, packageType, data);
    });
  }

  sendToAllExcept(clientId: number, packageType: string, data: any) {
    this.server.clients.forEach((client) => {
      if (client.id !== clientId) {
        this.sendTo(client.id, packageType, data);
      }
    });
  }
}
