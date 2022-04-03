import MinecraftServerManager from "../minecraftServer/MinecraftServerManager";

/**
 * Frontend Network Server
 * Responsible for handling communication between the browser frontend
 * and the proxy.
 * This will also handle creating server instances for clients by invoking
 * the server manager
 */
export default interface FrontendNetworkServer {
  start(): void;
  sendMessageToClient(
    clientId: string,
    messageKey: string,
    ...messageData: any[]
  ): void;

  // Server manager needs to be set separately to avoid circular dependency
  setServerManager(serverManager: MinecraftServerManager): void;
}
