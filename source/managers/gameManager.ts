import App from "app";
import { ScreenManager } from "./screenManager";

export class GameManager {
  readonly application: App;
  readonly screen: ScreenManager;

  constructor(app: App) {
    this.application = app;
    this.screen = new ScreenManager(this);
  }

  Update(dt: number) {
    this.screen.UpdateEntity(dt);
  }
}
