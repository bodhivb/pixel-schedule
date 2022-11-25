import App from "../app";
import Overlay from "../overlay";
import { LoginView } from "../view/loginView";
import { SchoolView } from "../view/schoolView";
import { ScreenManager } from "./screenManager";

export class GameManager {
  readonly application: App;

  // The html overlay screen
  readonly HTMLoverlay?: Overlay;

  // The canvas screen
  readonly screen: ScreenManager;

  constructor(app: App, overlay?: Overlay) {
    this.application = app;
    this.HTMLoverlay = overlay;
    this.screen = new ScreenManager(this);

    const sintLucas = new SchoolView();
    this.screen.Add(sintLucas);

    // Page -> View -> Component -> Element
    const loginView = new LoginView();
    this.HTMLoverlay?.Add(loginView);
  }

  Update(dt: number) {
    this.screen.UpdateEntity(dt);
  }
}
