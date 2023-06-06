import { Cache, Sprite } from "pixi.js";
import { IRoom } from "../interfaces/roomInterface";
import { SortingLayer } from "../interfaces/sortingLayerEnum";

export class Room extends Sprite {
  /** Room name */
  public name: string;
  /** Room number */
  public number: string;

  constructor(data: IRoom) {
    super(Cache.get(data.type.asset));

    this.number = data.number;
    this.name = data.type.name;

    // Default settings for room
    this.anchor.set(0, 1);
    this.zIndex = SortingLayer.Room;
  }
}
