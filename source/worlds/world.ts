import { Container, DisplayObject, IPointData } from "pixi.js";
import { View } from "../views/view";

/** A viewpoint container class with a camera system, also known as a Scene class. */
export class World extends Container<View> {
  /** The camera position */
  public cameraPosition: IPointData = { x: 0, y: 0 };
  /** The camera zoom level */
  public cameraScale: number = 1;

  constructor() {
    super();

    // Test camera position/zoom
    this.pivot.set(100, 350);
    this.scale.set(2);
  }

  get getEntities() {
    let entities: DisplayObject[] = [];
    this.children.forEach((c) => entities.push(...c.getEntities));
    return entities;
  }
}
