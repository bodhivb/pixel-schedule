import { Cache, Rectangle } from "pixi.js";
import { BackgroundColor } from "../objects/backgroundColor";
import { Cloud } from "../objects/cloud";
import { Grass } from "../objects/grass";
import { getRandomInteger } from "../utils/random";
import { View } from "./view";
import { Scene } from "../scenes/scene";

export class BackgroundView extends View {
  private currentScene: Scene;

  constructor(currentScene: Scene) {
    super({ name: "Background" });
    this.currentScene = currentScene;

    // Add background color
    const backgroundColor = new BackgroundColor();
    this.addChild(backgroundColor);

    // Add background assets
    this.LoadBackgroundAssets();
  }

  public LoadBackgroundAssets() {
    // Load clouds
    const cloudCount = 10;
    const bounds =
      this.currentScene.camera.bounds ?? new Rectangle(0, 0, 1920, 1080);

    for (let i = 0; i < cloudCount; i++) {
      let cloud = new Cloud(bounds.width);

      cloud.x = (bounds.width / cloudCount) * i;
      cloud.y = getRandomInteger(0, bounds.height / 3);

      //this.entities.push(cloud);
      this.addChild(cloud);
    }

    // Load ground
    const ground = new Grass(Cache.get("grass"), bounds.width, 800);
    this.addChild(ground);
  }
}
