import { GameManager } from "./gameManager";
import { Scene } from "../scenes/scene";

/** The canvas screen */
export class SceneManager {
  // Private constructor to prevent instantiation
  private constructor() {}

  /** Get current screen. */
  private static get screen() {
    return GameManager.instance.application.stage;
  }

  /** Get all scenes in the screen. */
  private static get activeScenes(): Scene[] {
    return this.screen.children as Scene[];
  }

  /** Add a scene to the screen. */
  public static Add(scene: Scene) {
    this.screen.addChild(scene);
  }

  /** Update the active scene(s). */
  public static UpdateScenes(dt: number) {
    // Loop over list of all opened scenes
    for (let s = 0; s < this.activeScenes.length; s++) {
      this.activeScenes[s].Update(dt);
    }
  }
  
  /** Update the active scene(s). */
  public static UpdateMinuteScenes(dt: number) {
    // Loop over list of all opened scenes
    for (let s = 0; s < this.activeScenes.length; s++) {
      this.activeScenes[s].UpdateMinute(dt);
    }
  }

  /** Remove the active scene(s). */
  public static RemoveScene() {
    for (let i = this.activeScenes.length - 1; i >= 0; i--) {
      this.activeScenes[i].Remove();
      this.screen.removeChild(this.activeScenes[i]);
    }
  }
}
