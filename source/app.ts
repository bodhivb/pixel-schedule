import { GameManager } from "./managers/gameManager";
import { Application, Assets, BaseTexture, SCALE_MODES } from "pixi.js";
import { assetsManifest } from "./assetsManifest";
import Overlay from "overlay";

export default class App extends Application<HTMLCanvasElement> {
  readonly game: GameManager;

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

    //Load all assets
    //Assets..baseUrl = "assets";
    Assets.init({ manifest: assetsManifest });

    this.game = new GameManager(this, overlay);

    this.ticker.maxFPS = 90;
    this.ticker.add((dt) => this.Update(dt));
  }

  Resize() {
    // Resize the renderer
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  Update(dt: number) {
    this.game.Update(dt);
  }
}
