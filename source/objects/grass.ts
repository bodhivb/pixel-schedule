import { Resource, Texture, TilingSprite } from "pixi.js";

export class Grass extends TilingSprite {
  constructor(
    texture: Texture<Resource>,
    screenWidth: number,
    groundLevel: number
  ) {
    super(texture, screenWidth, texture.height);
    this.y = groundLevel;
  }
}
