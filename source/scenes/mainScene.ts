import { Rectangle } from "pixi.js";
import { GameManager } from "../managers/gameManager";
import { BackgroundView } from "../views/backgroundView";
import { SchoolView } from "../views/schoolView";
import { Scene } from "./scene";

export class MainScene extends Scene {
  constructor(gm: GameManager) {
    super(gm);
    this.camera.bounds = new Rectangle(0, 0, 1920, 900);
    this.camera.maxZoom = 5;

    const background = new BackgroundView(gm);
    this.addChild(background);

    const sintLucas = new SchoolView();
    this.addChild(sintLucas);
  }
}
