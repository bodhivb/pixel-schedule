export class HTMLView {
  private stage: HTMLElement;

  constructor() {
    this.stage = document.createElement("div");
  }

  Add(component: HTMLElement) {
    this.stage.appendChild(component);
  }

  get view(): HTMLElement {
    return this.stage;
  }
}
