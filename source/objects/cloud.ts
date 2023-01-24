import { Resource, Texture } from "pixi.js";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import { GameManager } from "../managers/gameManager";
import { getRandomInteger } from "../utils/random";
import { Entity } from "./entity";

enum ICloudSize {
  Small,
  Medium,
  Large,
}

export class Cloud extends Entity {
  readonly gameManager: GameManager;

  constructor(gm: GameManager) {
    const size: ICloudSize = getRandomInteger(
      ICloudSize.Small,
      ICloudSize.Large
    );

    super(Cloud.GetTexture(gm.assets, size));
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

  private static GetTexture(assets: any, size: ICloudSize): Texture<Resource> {
    switch (size) {
      case ICloudSize.Small:
        return assets.outdoors.cloud_small;
      case ICloudSize.Medium:
        return assets.outdoors.cloud_medium;
      case ICloudSize.Large:
        return assets.outdoors.cloud_large;
    }
  }
}
