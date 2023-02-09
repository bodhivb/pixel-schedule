import { Point, Resource, Sprite, Texture } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import "@pixi/math-extras";

export class Teacher extends Sprite implements IEntityEvent {
  // Input variable
  private target: Point;
  private idleDistance = 5;
  private idleWait = 5;

  // Output variable
  private targetIdle?: Point;

  constructor(texture?: Texture<Resource> | undefined) {
    super(texture);

    this.anchor.set(0.5, 0.9);
    this.target = new Point(400, 400);

    this.position = this.target;

    this.zIndex = SortingLayer.Character;
    this.scale.set(2);

    this.targetIdle = new Point(500, 300);
  }

  public Update(dt: number): void {
    if (this.targetIdle) {
      const distance = this.targetIdle.subtract(this.position);
      const direction = this.Clamp1(distance);

      const speed = 0.3;

      const xMove = direction.x * speed * dt;

      // Stop walking when it crosses the finish point
      if (Math.abs(distance.x) - Math.abs(xMove) <= 0) {
        this.x += distance.x;
        this.targetIdle = undefined;
      } else {
        // Keep walking
        this.x += xMove;
      }
    }
  }

  /**
   * Clamp point between -1 and 1
   * @param value
   * @returns
   */
  public Clamp1(value: Point) {
    return new Point(
      Math.min(Math.max(value.x, -1), 1),
      Math.min(Math.max(value.y, -1), 1)
    );
  }
}
