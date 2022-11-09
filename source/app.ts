import { Application, Texture, Sprite } from "pixi.js";

export default class App extends Application {
  constructor() {
    super({
      backgroundColor: 0x1099bb,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.ticker.maxFPS = 90;
    this.ticker.add((dt) => this.Update(dt));

    this.Resize();

    // Listen for window resize events
    window.addEventListener("resize", this.Resize);

    this.AddBunny();
  }

  // Resize function window
  Resize() {
    // Resize the renderer
    this.renderer.resize(window.innerWidth, window.innerHeight);

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
    this.ticker.add(() => {
      bunny.rotation += 0.1;
    });

    this.AddGraphics(bunny);
  }

  // Add it to the stage
  AddGraphics(obj: any) {
    this.stage.addChild(obj);
  }
}
