import CauldronClient from "../CauldronClient";

export default class Logger {
  public messages: string[] = [];

  constructor(private readonly client: CauldronClient) {}

  public addLogMessage(message: string) {
    this.messages.push(message);
    this.client.triggerUpdate();
  }
}
