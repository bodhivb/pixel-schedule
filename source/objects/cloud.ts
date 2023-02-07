import { Cache, Resource, Sprite, Texture } from "pixi.js";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import { GameManager } from "../managers/gameManager";
import { getRandomInteger } from "../utils/random";
import { IEntityEvent } from "../interfaces/entityEvent";

enum ICloudSize {
  Small,
  Medium,
  Large,
}

export class Cloud extends Sprite implements IEntityEvent {
  readonly gameManager: GameManager;

  constructor(gm: GameManager) {
    const size: ICloudSize = getRandomInteger(
      ICloudSize.Small,
      ICloudSize.Large
    );

    super(Cloud.GetTexture(size));
    this.gameManager = gm;

    this.anchor.set(0);
    this.zIndex = SortingLayer.Background;
    this.scale.set(1);
  }

  public Update(dt: number): void {
    if (this.x > this.gameManager.application.view.width) {
      this.x = -this.width;
    }

    this.x += 0.5 * dt;
  }

  private static GetTexture(size: ICloudSize): Texture<Resource> {
    switch (size) {
      case ICloudSize.Small:
        return Cache.get("cloud_small");
      case ICloudSize.Medium:
        return Cache.get("cloud_medium");
      case ICloudSize.Large:
        return Cache.get("cloud_large");
    }
  }
}