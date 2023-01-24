import { Sprite, Texture } from "pixi.js";
import { IRoom } from "../interfaces/roomInterface";
import { SortingLayer } from "../interfaces/sortingLayerEnum";

export class Room extends Sprite {
  constructor(data: IRoom, xAxis: number) {
    super(Texture.from("assets/" + data.type.url));

    this.anchor.set(0, 1);
    this.zIndex = SortingLayer.Room;

    this.x = 170 * xAxis + 200;
    this.y = 400;
  }
}
