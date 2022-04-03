/**
 * A single server proxy instance created for a user
 */
export default interface MinecraftServer {
  stop(): Promise<void>;
  getPort(): number;
  sendPackageToClient(
    clientId: number,
    packageType: string,
    contents: any
  ): void;
  updateMotd(motd: string): void;
}
