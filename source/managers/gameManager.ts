import { Assets } from "pixi.js";
import { assetsManifest } from "../assetsManifest";
import App from "../app";
import Overlay from "../overlay";
import { BackgroundView } from "../views/backgroundView";
import { LoginView } from "../views/loginView";
import { SchoolView } from "../views/schoolView";
import { ScreenManager } from "./screenManager";

export class GameManager {
  readonly application: App;

  // The html overlay screen
  readonly HTMLoverlay?: Overlay;

  // The canvas screen
  readonly screen: ScreenManager;

  // Link to all loaded assets
  assets: any;

  constructor(app: App, overlay?: Overlay) {
    this.application = app;
    this.HTMLoverlay = overlay;

    this.screen = new ScreenManager(this);

    //Load all assets
    this.LoadAssets().then((value) => {
      this.assets = value;
      this.OpenActiveScreen();
    });
  }

  async LoadAssets() {
    //Loading screen
    await Assets.init({ manifest: assetsManifest });

    const assets = await Assets.loadBundle(
      ["buildings", "outdoors", "rooms", "teachers"],
      (value) => console.log(value)
    );

    //Loading complete

    return assets;
  }

  OpenActiveScreen() {
    const background = new BackgroundView(this);
    this.screen.Add(background);

    const sintLucas = new SchoolView();
    this.screen.Add(sintLucas);

    // Page -> View -> Component -> Element
    //const loginView = new LoginView();
    //this.HTMLoverlay?.Add(loginView);
  }

  Update(dt: number) {
    this.screen.UpdateEntity(dt);
  }
}
