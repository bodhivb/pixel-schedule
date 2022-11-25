import { Entity } from "objects/entity";
import { Container } from "pixi.js";

export class View extends Container {
  name: string;
  entities: Entity[] = [];

  constructor(config?: any) {
    super();
    this.name = config.name || "Scene";
  }
}
