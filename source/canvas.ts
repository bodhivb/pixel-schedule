import { Application, Texture, Sprite } from "pixi.js";

export default class Canvas {
  readonly app: Application;

  constructor() {
    this.app = new Application({
      backgroundColor: 0x1099bb,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.app.ticker.maxFPS = 90;

    this.app.ticker.add((dt) => this.Update(dt));

    this.Resize();

    // Listen for window resize events
    window.addEventListener("resize", this.Resize);

    this.AddBunny();
  }

  get view(): HTMLCanvasElement {
    return this.app.view;
  }

  // Resize function window
  Resize() {
    // Resize the renderer
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    //this.app.stage.scale.set(5);
    //rect.position.set(app.screen.width / 2, app.screen.height / 2);
  }

  Update(dt: number) {}

  AddBunny() {
    const bunny = new Sprite(Texture.from("assets/examples/bunny.png"));
    bunny.anchor.set(0.5);
    bunny.x = 200;
    bunny.y = 120;

    //Rotate bunny a little
    this.app.ticker.add(() => {
      bunny.rotation += 0.1;
    });

    this.AddGraphics(bunny);
  }

  // Add it to the stage
  AddGraphics(obj: any) {
    this.app.stage.addChild(obj);
  }
}
