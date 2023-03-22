import { GameManager } from "./gameManager";
import { IEntityEvent } from "../interfaces/entityEvent";
import { Scene } from "../scenes/scene";

//SceneManager
export class SceneManager {
  readonly gameManager: GameManager;

  constructor(gm: GameManager) {
    this.gameManager = gm;
  }

  //Get current screen
  private get screen() {
    return this.gameManager.application.stage;
  }

  //Get all scenes in the screen
  private get activeScenes(): Scene[] {
    return this.screen.children as Scene[];
  }

  //Add a scene to the screen
  Add(scene: Scene) {
    this.screen.addChild(scene);
  }

  //Update the active scene(s)
  UpdateScenes(dt: number) {
    //Loop over list of all opened scenes
    for (let s = 0; s < this.activeScenes.length; s++) {
      this.activeScenes[s].Update(dt);
    }
  }

  //Remove the active scene(s)
  public RemoveScene() {
    for (let i = this.activeScenes.length - 1; i >= 0; i--) {
      this.activeScenes[i].Remove();
      this.screen.removeChild(this.activeScenes[i]);
    }
  }
}
