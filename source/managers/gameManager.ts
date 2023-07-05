import { Assets } from "pixi.js";
import { assetsManifest } from "../constants/assetsManifest";
import App from "../app";
import Overlay from "../overlay";
import { SceneManager } from "./sceneManager";
import { MainScene } from "../scenes/mainScene";
import { SetupView } from "../views/setupView";
import { SearchView } from "../views/searchView";
import { teacherStore } from "../store/teacherStore";
import { teacherService } from "../services/teacherService";

export class GameManager {
  // #region singleton

  /** The singleton instance. */
  private static _instance: GameManager;

  /** The gateway to the GameManager instance. Please make sure to call GameManager.init() first.*/
  public static get instance() {
    if (!GameManager._instance) {
      throw new Error(
        "GameManager class is not registered as a singleton. Please make sure to call GameManager.init() first."
      );
    }
    return GameManager._instance;
  }

  /**
   * Initialize this class.
   * @param app PIXI.Application
   * @param overlay Custom html overlay
   */
  public static init(app: App, overlay?: Overlay) {
    GameManager._instance = new GameManager(app, overlay);
  }

  // #endregion
  // #region properties

  // PIXI Application
  public readonly application: App;

  // The html overlay screen
  public readonly HTMLoverlay?: Overlay;

  // #endregion

  private constructor(app: App, overlay?: Overlay) {
    this.application = app;
    this.HTMLoverlay = overlay;

    // Load all assets
    this.LoadAssets().then(() => {
      // Loading assets is complete
      teacherStore.resetToDefaultData();
      teacherService.fetchTeachers();

      this.OpenActiveScreen();
    });
  }

  /** Load all manifest assets. */
  private async LoadAssets() {
    // Low priority: here you can create a loading screen

    // Link the manifest to the assets class
    await Assets.init({ manifest: assetsManifest });

    // Get names from manifest
    const bundleIds = assetsManifest.bundles.map((bundle) => bundle.name);

    // Download all assets
    const assets = await Assets.loadBundle(bundleIds, (value) =>
      //TODO Add loading bar (value increase from 0.0 to 1.0)
      {}
    );

    // Loading assets is complete

    return assets;
  }

  private OpenActiveScreen() {
    SceneManager.Add(new MainScene());
    // Page -> View -> Component -> Element
    const setupView = new SetupView();
    this.HTMLoverlay?.Add(setupView);

    const searchView = new SearchView();
    this.HTMLoverlay?.Add(searchView);
  }

  public Update(dt: number) {
    SceneManager.UpdateScenes(dt);
  }

  public UpdateMinute(dt: number) {
    SceneManager.UpdateMinuteScenes(dt);
  }
}
