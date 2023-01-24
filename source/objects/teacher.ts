import { Resource, Sprite, Texture } from "pixi.js";
import { SortingLayer } from "../interfaces/sortingLayerEnum";

export class Teacher extends Sprite {
  constructor(texture?: Texture<Resource> | undefined) {
    super(texture);

    this.anchor.set(0.5, 0.9);

    this.x = 400;
    this.y = 400;

    this.zIndex = SortingLayer.Character;
    this.scale.set(2);
  }

  public Update(dt: number): void {
    this.x += 3 * dt;
  }
}
