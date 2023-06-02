import { Cache, Point, Sprite, Ticker } from "pixi.js";
import { OutlineFilter } from "@pixi/filter-outline";
import { IEntityEvent } from "../interfaces/entityEvent";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import "@pixi/math-extras";
import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { getTeacherColorNumber } from "../utils/teacherColor";

export class Teacher extends Sprite implements IEntityEvent {
  // Input variable
  public readonly data: ITeacher;

  // Hidden variable
  private target: Point;
  private idleDistance = 140;
  private idleWait = 4;
  private idleWalkSpeed = 0.4;

  // Output variable
  private targetIdle?: Point;

  // Render variable
  private outlineFilter;

  constructor(teacherData: ITeacher) {
    super(Cache.get(teacherData.imageKey));

    this.data = teacherData;

    // Set outline color
    const color = getTeacherColorNumber(teacherData);
    this.outlineFilter = new OutlineFilter(2, color[1]);

    // Set teacher position
    this.anchor.set(0.5, 0.9);
    this.target = new Point(0, 0);
    this.position = this.target;

    this.zIndex = SortingLayer.Character;
    this.scale.set(1.3);
    this.SetNewIdlePosition();

    // Set interactive
    this.interactive = true;
    this.cursor = "pointer";
    this.on("pointerover", this.onPointerOver);
    this.on("pointerout", this.onPointerOut);
  }

  private waitTimer = 0;
  public Update(dt: number): void {
    if (this.waitTimer > 0) {
      this.waitTimer -= dt;
    } else if (this.targetIdle) {
      const distance = this.targetIdle.subtract(this.position);
      const direction = this.SquareDirection(distance);

      const xMove = direction.x * this.idleWalkSpeed * dt;

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

  // Set the next target position of the teacher
  public SetTarget(target: Point, idleDistance?: number) {
    this.target = target;

    if (idleDistance) this.idleDistance = idleDistance;

    // TODO Ajust height at elevator
    this.position.y = target.y;

    this.SetNewIdlePosition();
  }

  private SetNewIdlePosition() {
    const newIdleXPos = Math.random() * this.idleDistance;

    this.targetIdle = new Point(
      this.target.x - this.idleDistance / 2 + newIdleXPos,
      this.target.y
    );
  }

  public SetWaitTime(second: number) {
    this.waitTimer = second * (Ticker.targetFPMS * 1000);
  }

  private onPointerOver() {
    this.filters = [this.outlineFilter];
  }

  private onPointerOut() {
    this.filters = [];
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
