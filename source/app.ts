import { GameManager } from "./managers/gameManager";
import { Application, BaseTexture, SCALE_MODES } from "pixi.js";
import Overlay from "./overlay";

export default class App extends Application<HTMLCanvasElement> {
  constructor(overlay?: Overlay) {
    super({
      backgroundColor: 0x1099bb,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Disable interpolation when scaling, will make texture be pixelated
    BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

    // Listen for window resize events
    window.addEventListener("resize", () => this.Resize());

    GameManager.init(this, overlay);

    this.ticker.maxFPS = 90;
    this.ticker.add((dt) => this.Update(dt));
  }

  Resize() {
    // Resize the renderer
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  Update(dt: number) {
    GameManager.instance.Update(dt);
  }
}
