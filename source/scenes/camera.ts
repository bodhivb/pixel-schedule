import {
  FederatedPointerEvent,
  FederatedWheelEvent,
  IPointData,
} from "pixi.js";
import { GameManager } from "../managers/gameManager";
import { Scene } from "./scene";

/** The camera control system for scene. */
export class Camera {
  /** The camera position. */
  public cameraPosition: IPointData = { x: 0, y: 0 };
  /** The camera zoom level. */
  public cameraScale: number = 2;

  /** Indicates position when the mouse is pressed. */
  private mousePosition?: IPointData = undefined;

  private moveEvent = (e: FederatedPointerEvent) => this.OnPointerMove(e);

  /** The scene container where we need to control it. */
  private scene: Scene;

  /** Warning: this variable is deprecated and will be removed in a future version. */
  private gm: GameManager;

  constructor(currentScene: Scene, gm: GameManager) {
    this.scene = currentScene;
    this.gm = gm;

    // Put the world into the center of camera screen.
    this.scene.x = this.gm.application.renderer.screen.width / 2;
    this.scene.y = this.gm.application.renderer.screen.height / 2;

    // Use pivot point to control camera.
    this.scene.pivot.set(this.cameraPosition.x, this.cameraPosition.y);

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
      // Calculate new camera coordinates by mouse movements.
      const previousMove = this.scene.toLocal(this.mousePosition);
      const newMove = this.scene.toLocal(e.global);

      this.scene.pivot.x -= newMove.x - previousMove.x;
      this.scene.pivot.y -= newMove.y - previousMove.y;
    }

    this.mousePosition = { x: e.global.x, y: e.global.y };
  }

  private OnZoom(e: FederatedWheelEvent) {
    let previousCoordinates = this.scene.toLocal({
      x: e.global.x,
      y: e.global.y,
    });

    // Adjust the camera zoom.
    this.cameraScale -= (e.deltaY / 1000) * this.cameraScale;
    this.scene.scale.set(this.cameraScale);

    let newCoordinates = this.scene.toLocal({ x: e.global.x, y: e.global.y });

    // Zoom to the mouse cursor instead of screen center.
    this.scene.pivot.x -= newCoordinates.x - previousCoordinates.x;
    this.scene.pivot.y -= newCoordinates.y - previousCoordinates.y;
  }
}
