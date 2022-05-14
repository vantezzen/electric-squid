import { Item, Window } from "minecraft-data";
import ServerClientMock from "./ServerClientMock";

export type CauldronConfig = {
  version: string;
  motd: string;
};
export type FlyingSquidConfig = {
  [key: string]: any;
};
export type Vector = {
  x: number;
  y: number;
  z: number;
};
export type Player = {
  addEffect: (effectId: number, opt: any) => any;
  attach: (attachedEntity: Player, leash: boolean) => any;
  banIP: (reason: string) => any;
  banUUID: (reason: string) => any;
  banUsername: (reason: string) => any;
  behavior: (
    eventName: string,
    data: any,
    func: any,
    cancelFunc: any
  ) => Promise<any>;
  bornTime: number;
  calculatePhysics: (delta: number) => Promise<any>;
  chat: (message: string) => any;
  crouching: boolean;
  destroy: () => void;
  displayXp: number;
  effects: {
    [key: number]: any | null;
  };
  food: number;
  gameMode: number;
  getData: (pluginName: string) => any;
  getNearby: () => any;
  handleCommand: (str: string) => Promise<any>;
  health: number;
  height: number;
  heldItem: Item;
  heldItemSlot: number;
  id: number;
  inventory: Window;
  isValid: boolean;
  kick: (reason?: string) => void;
  level: number;
  onGround: boolean;
  op: boolean;
  position: Vector;
  prevGameMode: number;
  setGameMode: (gameMode: number) => any;
  spawnPoint: Vector;
  system: (message: string) => any;
  teleport: (position: Vector) => any;
  type: "player";
  username: string;
  uuid: string;
  velocity: Vector;
  viewDistance: number;
  xp: number;
  xpLevel: number;
  yaw: number;
  _client: ServerClientMock;
};
