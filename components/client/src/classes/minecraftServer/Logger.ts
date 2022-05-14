import SquidClient from "../SquidClient";

export default class Logger {
  public messages: string[] = [];

  constructor(private readonly client: SquidClient) {}

  public addLogMessage(message: string) {
    this.messages.push(message);
    this.client.triggerUpdate();
  }
}
