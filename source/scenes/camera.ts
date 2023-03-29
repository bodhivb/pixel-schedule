import {
  FederatedPointerEvent,
  FederatedWheelEvent,
  IPointData,
  ObservablePoint,
  Rectangle,
} from "pixi.js";
import { GameManager } from "../managers/gameManager";
import { Scene } from "./scene";

/** The camera control system for scene. */
export class Camera {
  /** The camera position. This uses scene pivot point to control position. */
  public get position(): ObservablePoint {
    return this.scene.pivot;
  }
  public set position(value: IPointData) {
    this.scene.pivot = value;
  }

  /** The camera bounds. */
  private bounds?: Rectangle;
  private minZoomBounds?: number;

  /** The camera zoom level. */
  public scale: number = 1;

  /** Indicates position when the mouse is pressed. */
  private mousePosition?: IPointData = undefined;

  private maxZoom = 5;
  private minZoom = 1;

  private moveEvent = (e: FederatedPointerEvent) => this.OnPointerMove(e);

  /** The scene container where we need to control it. */
  private scene: Scene;

  /** Warning: this variable is deprecated and will be removed in a future version. */
  private gm: GameManager;

  /** Setup the camera bounds. */
  public SetBounds(value?: Rectangle) {
    this.bounds = value;
    this.SetBoundZoom();
    this.CheckBounds();
  }

  constructor(currentScene: Scene, gm: GameManager) {
    this.scene = currentScene;
    this.gm = gm;

    // Put the world into the center of camera screen
    this.scene.x = this.gm.application.renderer.screen.width / 2;
    this.scene.y = this.gm.application.renderer.screen.height / 2;

    this.scene.interactive = true;

    // Listen for mouse/touch events
    this.scene.on("pointerdown", (e) => this.OnPointerDown(e));
    this.scene.on("pointerup", (e) => this.OnPointerUp(e));
    this.scene.on("pointerleave", (e) => this.OnPointerUp(e));
    this.scene.on("wheel", (e) => this.OnZoom(e));
  }

  private OnPointerDown(e: FederatedPointerEvent) {
    this.mousePosition = { x: e.global.x, y: e.global.y };
    this.scene.on("pointermove", this.moveEvent);
  }

  private OnPointerUp(e: FederatedPointerEvent) {
    this.mousePosition = undefined;
    this.scene.off("pointermove", this.moveEvent);
  }

  private OnPointerMove(e: FederatedPointerEvent) {
    if (this.mousePosition) {
      // Calculate new camera coordinates by mouse movements
      const previousMove = this.scene.toLocal(this.mousePosition);
      const newMove = this.scene.toLocal(e.global);

      this.scene.pivot.x -= newMove.x - previousMove.x;
      this.scene.pivot.y -= newMove.y - previousMove.y;

      this.CheckBounds();
    }

    this.mousePosition = { x: e.global.x, y: e.global.y };
  }

  private OnZoom(e: FederatedWheelEvent) {
    let newScale = this.scale - (e.deltaY / 1000) * this.scale;

    if (newScale > this.maxZoom) newScale = this.maxZoom;

    if (newScale < (this.minZoomBounds ?? this.minZoom))
      newScale = this.minZoomBounds ?? this.minZoom;

    // Stop calculate if new zoom level is same as current - optional
    if (newScale === this.scale) return;

    let previousCoordinates = this.scene.toLocal({
      x: e.global.x,
      y: e.global.y,
    });

    // Adjust the camera zoom
    this.scale = newScale;
    this.scene.scale.set(this.scale);

    let newCoordinates = this.scene.toLocal({ x: e.global.x, y: e.global.y });

    // Zoom to the mouse cursor instead of screen center
    this.scene.pivot.x -= newCoordinates.x - previousCoordinates.x;
    this.scene.pivot.y -= newCoordinates.y - previousCoordinates.y;

    this.CheckBounds();
  }

  /** Adjust camera position if it is out of bounds. */
  private CheckBounds() {
    if (this.bounds) {
      const x = this.bounds.x + this.scene.x / this.scale;
      const y = this.bounds.y + this.scene.y / this.scale;
      const w = this.bounds.x + this.bounds.width - this.scene.x / this.scale;
      const h = this.bounds.y + this.bounds.height - this.scene.y / this.scale;

      // Check x-axis bounds
      if (this.scene.pivot.x < x) {
        this.scene.pivot.x = x;
      } else if (this.scene.pivot.x > w) {
        this.scene.pivot.x = w;
      }

      // Check y-axis bounds
      if (this.scene.pivot.y < y) {
        this.scene.pivot.y = y;
      } else if (this.scene.pivot.y > h) {
        this.scene.pivot.y = h;
      }
    }
  }

  /**
   * Calculate the real maximum zoom out with the screen, once the camera is never zoomed out too far.
   */
  private SetBoundZoom() {
    if (this.bounds) {
      // Calculates scale length
      const xScale =
        this.gm.application.renderer.screen.width / this.bounds.width;
      const yScale =
        this.gm.application.renderer.screen.height / this.bounds.height;

      // Adjust if these calculates are over the min value
      if (xScale > this.minZoom || yScale > this.minZoom) {
        this.minZoomBounds = xScale > yScale ? xScale : yScale;

        if (this.scale < this.minZoomBounds) {
          this.scale = this.minZoomBounds;
          this.scene.scale.set(this.scale);
        }
      } else {
        this.minZoomBounds = undefined;
      }
    } else {
      this.minZoomBounds = undefined;
    }
  }
}