import { Container, Rectangle } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";
import { GameManager } from "../managers/gameManager";
import { View } from "../views/view";
import { Camera } from "./camera";

/** A viewpoint container class with a camera system. */
export abstract class Scene extends Container<View> {
  private camera: Camera;

  constructor(gm: GameManager) {
    super();
    this.camera = new Camera(this, gm);
    this.camera.SetBounds(new Rectangle(0, 0, 1920, 900));
  }

  Update(dt: number) {
    //this.rotation += 0.01;

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
