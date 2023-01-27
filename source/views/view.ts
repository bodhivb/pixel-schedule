import { Container } from "pixi.js";

export class View extends Container {
  name: string;

  get getEntities() {
    return this.children;
  }

  constructor(config?: { name?: string }) {
    super();
    this.name = config?.name || "Scene";
  }
}
