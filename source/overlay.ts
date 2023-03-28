import { HTMLView } from "./views/htmlView";

/** The full-screen HTML overlay. */
export default class Overlay {
  view: HTMLDivElement;

  constructor() {
    this.view = this.CreateOverlay();
  }

  public Add(component: HTMLElement | HTMLView) {
    if (component instanceof HTMLView) {
      this.view.appendChild(component.view);
    } else {
      this.view.appendChild(component);
    }
  }

  public Clear() {
    this.view.innerHTML = "";
  }

  private CreateOverlay(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    return overlay;
  }
}
