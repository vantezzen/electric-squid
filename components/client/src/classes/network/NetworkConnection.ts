export default interface NetworkConnection {
  sendPackageToClient(
    clientId: number,
    packageType: string,
    packageData: any
  ): void;

  on(event: "game-event", listener: (...data: any[]) => void): this;
}
