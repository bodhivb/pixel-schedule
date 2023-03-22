import { Container, FederatedPointerEvent, IPointData } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";
import { GameManager } from "../managers/gameManager";
import { View } from "../views/view";

/** A viewpoint container class with a camera system. */
export abstract class Scene extends Container<View> {
  /** The camera position. */
  public cameraPosition: IPointData = { x: 0, y: 0 };
  /** The camera zoom level. */
  public cameraScale: number = 1;

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
  }


  Move() {}

  Update(dt: number) {
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
