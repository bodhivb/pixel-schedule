import { Rectangle } from "pixi.js";
import { BackgroundView } from "../views/backgroundView";
import { SchoolView } from "../views/schoolView";
import { Scene } from "./scene";

export class MainScene extends Scene {
  constructor() {
    super();
    this.camera.bounds = new Rectangle(0, 0, 1920, 900);
    this.camera.maxZoom = 5;

    const background = new BackgroundView(this);
    this.addChild(background);

    const sintLucas = new SchoolView();
    this.addChild(sintLucas);
  }
}
