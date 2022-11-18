import App from "../app";
import Overlay from "../overlay";
import { LoginView } from "../Views/loginView";
import { SchoolView } from "../Views/schoolView";
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

    let SintLucas = new SchoolView();
    this.screen.Add(SintLucas);

    //let loginView = new LoginView();
    //this.screen.Add(loginView);

    // Page -> View -> Component -> Element
  }

  Update(dt: number) {
    this.screen.UpdateEntity(dt);
  }
}
