export class HTMLView {
  private stage: HTMLElement;

  constructor() {
    this.stage = document.createElement("div");
  }

  Add(component: HTMLElement, clickable: boolean = true) {
    // Add clickadble
    if (clickable) component.classList.add("clickable");
    this.stage.appendChild(component);
  }

  Remove(component: HTMLElement) {
    // Remove clickable if it exists
    component.classList.remove("clickable");
    this.stage.removeChild(component);
  }

  get view(): HTMLElement {
    return this.stage;
  }
}
