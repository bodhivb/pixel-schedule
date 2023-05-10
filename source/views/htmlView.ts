export class HTMLView {
  private stage: HTMLElement;

  constructor() {
    this.stage = document.createElement("div");
  }

  Add(component: HTMLElement) {
    // Add clickadble
    component.classList.add("clickable");
    this.stage.appendChild(component);
  }

  get view(): HTMLElement {
    return this.stage;
  }
}
