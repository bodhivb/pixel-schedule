import { Point, Resource, Sprite, Texture, Ticker } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import "@pixi/math-extras";

export class Teacher extends Sprite implements IEntityEvent {
  // Input variable
  private target: Point;
  private idleDistance = 140;
  private idleWait = 4;

  // Output variable
  private targetIdle?: Point;

  constructor(texture?: Texture<Resource> | undefined) {
    super(texture);

    this.anchor.set(0.5, 0.9);
    this.target = new Point(400, 799);

    this.position = this.target;

    this.zIndex = SortingLayer.Character;
    this.scale.set(1.3);
    this.SetNewIdlePosition();
  }

  private waitTimer = 0;
  public Update(dt: number): void {
    if (this.waitTimer > 0) {
      this.waitTimer -= dt;
    } else if (this.targetIdle) {
      const distance = this.targetIdle.subtract(this.position);
      const direction = this.SquareDirection(distance);

      const speed = 0.3;

      const xMove = direction.x * speed * dt;

      // Stop walking when it crosses the finish point
      if (Math.abs(distance.x) - Math.abs(xMove) <= 0) {
        this.x += distance.x;
        this.targetIdle = undefined;

        // Set the next idle motion
        this.SetNewIdlePosition();
        this.SetWaitTime(this.idleWait);
      } else {
        // Keep walking
        this.x += xMove;
      }
    }
  }

  public SetNewIdlePosition() {
    const newIdleXPos = Math.random() * this.idleDistance;

    this.targetIdle = new Point(
      this.target.x - this.idleDistance / 2 + newIdleXPos,
      this.target.y
    );
  }

  public SetWaitTime(second: number) {
    this.waitTimer = second * (Ticker.targetFPMS * 1000);
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
    7;
  }

  /**
   * Adjusts the direction with length of each axis
   * @param value
   * @returns
   */
  public SquareDirection(value: Point) {
    return new Point(
      value.x == 0 ? 0 : value.x > 0 ? 1 : -1,
      value.y == 0 ? 0 : value.y > 0 ? 1 : -1
    );
  }
}
