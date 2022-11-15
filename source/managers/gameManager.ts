import App from "app";
import { SchoolView } from "../Views/schoolView";
import { ScreenManager } from "./screenManager";

export class GameManager {
  readonly application: App;
  readonly screen: ScreenManager;

  constructor(app: App) {
    this.application = app;
    this.screen = new ScreenManager(this);

    let SintLucas = new SchoolView();
    this.screen.Add(SintLucas);
  }

  Update(dt: number) {
    this.screen.UpdateEntity(dt);
  }
}
