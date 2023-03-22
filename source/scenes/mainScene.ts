import { GameManager } from "../managers/gameManager";
import { BackgroundView } from "../views/backgroundView";
import { SchoolView } from "../views/schoolView";
import { Scene } from "./scene";

export class MainScene extends Scene {
  constructor(gm: GameManager) {
    super(gm);

    const background = new BackgroundView(gm);
    this.addChild(background);

    const sintLucas = new SchoolView();
    this.addChild(sintLucas);
  }
}
