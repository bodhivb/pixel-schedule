import { Assets } from "pixi.js";
import { assetsManifest } from "../assetsManifest";
import App from "../app";
import Overlay from "../overlay";
import { BackgroundView } from "../views/backgroundView";
import { LoginView } from "../views/loginView";
import { SchoolView } from "../views/schoolView";
import { SceneManager } from "./sceneManager";
import { MainScene } from "../scenes/mainScene";

//TODO Convert this class to singleton or static class
export class GameManager {
  readonly application: App;

  // The html overlay screen
  readonly HTMLoverlay?: Overlay;

  // The canvas screen
  readonly screen: SceneManager;

  constructor(app: App, overlay?: Overlay) {
    this.application = app;
    this.HTMLoverlay = overlay;

    this.screen = new SceneManager(this);

    // Load all assets
    this.LoadAssets().then(() => {
      this.OpenActiveScreen();
    });
  }

  /** Load all manifest assets. */
  async LoadAssets() {
    // Low priority: here you can create a loading screen

    // Link the manifest to the assets class
    await Assets.init({ manifest: assetsManifest });

    // Get names from manifest
    const bundleIds = assetsManifest.bundles.map((bundle) => bundle.name);

    // Download all assets
    const assets = await Assets.loadBundle(bundleIds, (value) =>
      console.log(value)
    );

    // Loading assets is complete

    return assets;
  }

  OpenActiveScreen() {
    this.screen.Add(new MainScene(this));
    // Page -> View -> Component -> Element
    //const loginView = new LoginView();
    //this.HTMLoverlay?.Add(loginView);
  }

  Update(dt: number) {
    this.screen.UpdateScenes(dt);
  }
}
