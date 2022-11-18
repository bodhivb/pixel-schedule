import { createTextField } from "./elements/textField";

/** The full-screen HTML overlay. */
export default class Overlay {
  view: HTMLDivElement;

  constructor() {
    this.view = this.createOverlay();
    this.view.appendChild(createTextField());
  }

  private createOverlay(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");
    return overlay;
  }
}
