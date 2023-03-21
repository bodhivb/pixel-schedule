import { GameManager } from "../managers/gameManager";
import { BackgroundView } from "../views/backgroundView";
import { SchoolView } from "../views/schoolView";
import { World } from "./world";

export class MainWorld extends World {
  constructor(gm: GameManager) {
    super();

    const background = new BackgroundView(gm);
    this.addChild(background);

    const sintLucas = new SchoolView();
    this.addChild(sintLucas);
  }
}
