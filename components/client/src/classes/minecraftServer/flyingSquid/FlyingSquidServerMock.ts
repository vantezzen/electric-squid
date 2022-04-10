import EventEmitter from "events";
import FlyingSquidWrapper from "./FlyingSquidWrapper";

export default class FlyingSquidServerMock extends EventEmitter {
  constructor(private wrapper: FlyingSquidWrapper) {
    super();
  }
}
