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
    window.addEventListener("resize", () => this.OnResize());

    // Initialize GameManager
    GameManager.init(this, overlay);
    
    this.ticker.add((dt) => this.Update(dt));

    // call updateMinute once every minute
    setInterval(function(self) {
      self.ticker.addOnce((dt) => self.UpdateMinute(dt));
    }, 60 * 1000, this)
  }

  // Trigger when the browser window is resized.
  private OnResize() {
    // Resize the renderer
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private Update(dt: number) {
    GameManager.instance.Update(dt);
  }

  private UpdateMinute(dt: number) {
    GameManager.instance.UpdateMinute(dt);
  }

}
