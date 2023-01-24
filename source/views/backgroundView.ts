import { DisplayObject, Sprite } from "pixi.js";
import { GameManager } from "../managers/gameManager";
import { Cloud } from "../objects/cloud";
import { getRandomInteger } from "../utils/random";
import { View } from "./view";

export class BackgroundView extends View {
  readonly gameManager: GameManager;

  constructor(gm: GameManager) {
    super("Background");

    this.gameManager = gm;
    this.LoadBackground();
  }

  public LoadBackground() {
    //Load clouds
    const cloudCount = 10;
    const view = this.gameManager.application.view;

    for (let i = 0; i < cloudCount; i++) {
      let cloud = new Cloud(this.gameManager);

      const s: DisplayObject = this.children[0];

      if (s instanceof Sprite) {
        (s as Sprite).x = 10;
      }

      cloud.x = (view.width / cloudCount) * i;
      cloud.y = getRandomInteger(0, view.height / 3);

      //this.entities.push(cloud);
      this.addChild(cloud);
    }

    //Load ground
  }
}
