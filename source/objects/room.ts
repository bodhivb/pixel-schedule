import { Texture } from "pixi.js";
import { IRoom } from "../interfaces/roomInterface";
import { Entity } from "./entity";

export class Room extends Entity {
  constructor(data: IRoom, xAxis: number) {
    super(Texture.from("assets/" + data.type.url));

    this.anchor.set(0, 1);

    this.x = 170 * xAxis + 200;
    this.y = 400;
  }
}
