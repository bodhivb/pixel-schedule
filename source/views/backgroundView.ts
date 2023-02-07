import { Cache, DisplayObject, Sprite } from "pixi.js";
import { GameManager } from "../managers/gameManager";
import { BackgroundColor } from "../objects/backgroundColor";
import { Cloud } from "../objects/cloud";
import { Grass } from "../objects/grass";
import { getRandomInteger } from "../utils/random";
import { View } from "./view";

export class BackgroundView extends View {
  readonly gameManager: GameManager;

  constructor(gm: GameManager) {
    super({ name: "Background" });

    this.gameManager = gm;

    // Add background color
    const backgroundColor = new BackgroundColor();
    this.addChild(backgroundColor);

    // Add background assets
    this.LoadBackgroundAssets();
  }

  public LoadBackgroundAssets() {
    // Load clouds
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

    // Load ground
    const ground = new Grass(Cache.get("grass"), view.width, 800);
    this.addChild(ground);
  }
}
