import { Container, FederatedPointerEvent, IPointData, Point } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";
import { GameManager } from "../managers/gameManager";
import { View } from "../views/view";

/** A viewpoint container class with a camera system. */
export abstract class Scene extends Container<View> {
  /** The camera position. */
  public cameraPosition: IPointData = { x: 0, y: 0 };
  /** The camera zoom level. */
  public cameraScale: number = 2;

  //** Indicates position when the mouse is pressed. */
  private mousePosition?: IPointData = undefined;

  private gm: GameManager;

  constructor(gm: GameManager) {
    super();

    this.gm = gm;

    // Put the world into the center of screen.
    this.x = gm.application.renderer.screen.width / 2;
    this.y = gm.application.renderer.screen.height / 2;

    // Use pivot point to control camera.
    this.pivot.set(this.cameraPosition.x, this.cameraPosition.y);
    //this.pivot.set(gm.application.renderer.screen.width / 2, gm.application.renderer.screen.height / 2);
    this.scale.set(this.cameraScale);

    //this.updateTransform();
    //InteractionData.prototype.getLocalPosition.call;

    this.interactive = true;
    this.on("pointerdown", (e: FederatedPointerEvent) => this.OnPointerDown(e));
    this.on("pointerup", (e: FederatedPointerEvent) => this.OnPointerUp(e));
    this.on("pointerleave", (e: FederatedPointerEvent) => this.OnPointerUp(e));
  }

  Zoom(isZoomIn: boolean, mouseX: number, mouseY: number) {
    let previousCoordinates = this.toLocal({ x: mouseX, y: mouseY });

    // Adjust the camera zoom
    this.cameraScale += isZoomIn ? 0.01 : -0.01;
    this.scale.set(this.cameraScale);

    let newCoordinates = this.toLocal({ x: mouseX, y: mouseY });

    // Zoom to the mouse cursor instead of screen center.
    this.pivot.x -= newCoordinates.x - previousCoordinates.x;
    this.pivot.y -= newCoordinates.y - previousCoordinates.y;
    //this.updateTransform();
  }

  private OnPointerDown(e: FederatedPointerEvent) {
    this.mousePosition = { x: e.global.x, y: e.global.y };
    this.on("pointermove", this.OnPointerMove);
  }

  private OnPointerMove(e: FederatedPointerEvent) {
    if (this.mousePosition) {
      // Calculate new camera coordinates by mouse movements.
      const previousMove = this.toLocal(this.mousePosition);
      const newMove = this.toLocal({ x: e.global.x, y: e.global.y });

      this.pivot.x -= newMove.x - previousMove.x;
      this.pivot.y -= newMove.y - previousMove.y;
    }

    this.mousePosition = { x: e.global.x, y: e.global.y };
  }

  private OnPointerUp(e: FederatedPointerEvent) {
    this.mousePosition = undefined;
    this.off("pointermove", this.OnPointerMove);
  }

  Update(dt: number) {
    //Test code
    if (this.cameraScale > 2) {
    } else {
      this.Zoom(
        true,
        this.gm.application.renderer.screen.width / 2,
        this.gm.application.renderer.screen.height / 2
      );
    }

    //List of all views
    for (let v = 0; v < this.children.length; v++) {
      //TODO Check before if function exists. If yes > add it to event listeren
      (this.children[v] as IEntityEvent).Update?.(dt);

      //List of all entities from view
      for (let e = 0; e < this.children[v].children.length; e++) {
        (this.children[v].children[e] as IEntityEvent).Update?.(dt);
      }
    }
  }

  Remove() {
    //List of all views
    for (let v = 0; v < this.children.length; v++) {
      //List of all entities from view
      for (let e = 0; e < this.children[v].children.length; e++) {
        (this.children[v].children[e] as IEntityEvent).OnDestroy?.();
      }
      (this.children[v] as IEntityEvent).OnDestroy?.();
    }
  }
}
