import { Container } from "pixi.js";

export class View extends Container {
  name: string;

  constructor(config?: { name?: string }) {
    super();
    this.name = config?.name || "Scene";
  }
}
