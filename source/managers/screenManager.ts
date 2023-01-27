import { View } from "views/view";
import { GameManager } from "./gameManager";
import { IEntityEvent } from "../interfaces/entityEvent";
import { Sprite } from "pixi.js";

//SceneManager
export class ScreenManager {
  readonly gameManager: GameManager;

  constructor(gm: GameManager) {
    this.gameManager = gm;
  }

  //Get current screen
  private get screen() {
    return this.gameManager.application.stage;
  }

  //Get all views in the screen
  private get activeViews(): View[] {
    return this.screen.children as View[];
  }

  //Add a view to the screen
  Add(view: View) {
    this.screen.addChild(view);
  }

  //Update the screen
  UpdateEntity(dt: number) {
    for (let i = 0; i < this.activeViews.length; i++) {
      for (let e = 0; e < this.activeViews[i].getEntities.length; e++) {
        //TODO Check before if function exists. If yes > add it to event listeren
        (this.activeViews[i].getEntities[e] as IEntityEvent).Update?.(dt);
      }
    }
  }

  //Clean up the screen
  public Clear() {
    for (let i = this.activeViews.length - 1; i >= 0; i--) {
      for (let e = 0; e < this.activeViews[i].getEntities.length; e++) {
        (this.activeViews[i].getEntities[e] as IEntityEvent).OnDestroy?.();
      }
      this.screen.removeChild(this.activeViews[i]);
    }
  }
}
