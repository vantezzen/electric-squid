export default interface NetworkConnection {
  sendPackageToClient(
    clientId: number,
    packageType: string,
    packageData: any
  ): void;
}
