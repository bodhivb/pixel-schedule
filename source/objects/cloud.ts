import { Texture } from "pixi.js";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import { Entity } from "./entity";

export enum ICloudSize {
  Small,
  Medium,
  Large,
}

export class Cloud extends Entity {
  constructor() {
    //TODO Random cloud size

    const texture = Texture.from(Cloud.GetTexture(ICloudSize.Medium));
    super(texture);

    this.anchor.set(0.5);

    this.zIndex = SortingLayer.Background;
    this.scale.set(1);
  }

  public Update(dt: number): void {
    if (this.x > 2000) {
      this.x -= 2200;
    }

    this.x += 0.5 * dt;
  }

  private static GetTexture(size: ICloudSize): string {
    switch (size) {
      case ICloudSize.Small:
        return "assets/outdoors/cloud_small.png";
      case ICloudSize.Medium:
        return "assets/outdoors/cloud_medium.png";
      case ICloudSize.Large:
        return "assets/outdoors/cloud_large.png";
    }
  }
}
