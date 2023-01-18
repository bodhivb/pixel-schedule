import { GameManager } from "../managers/gameManager";
import { Cloud } from "../objects/cloud";
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
    for (let i = 0; i < cloudCount; i++) {
      let cloud = new Cloud();
      cloud.x = (this.gameManager.application.view.width / cloudCount) * i;
      cloud.y = Math.floor(Math.random() * 500);

      this.entities.push(cloud);
      this.addChild(cloud);
    }
  }
}
