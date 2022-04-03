import ClientConnectedHandler from "./ClientConnectedHandler";
import ClientDisconnectedHandler from "./ClientDisconnectedHandler";

export default [new ClientConnectedHandler(), new ClientDisconnectedHandler()];
