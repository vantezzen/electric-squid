import Server from "./Server";

class Net {
  createServer() {
    return new Server();
  }
}

export default new Net();
