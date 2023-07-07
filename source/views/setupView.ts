import { HTMLView } from "./htmlView";
import { createButton } from "../elements/button";
import { createPopup } from "../elements/popup";
import { createLabel } from "../elements/label";
import { createImage } from "../elements/image";

export class SetupView extends HTMLView {
  private popup: HTMLElement;
  private setupButton: HTMLButtonElement;

  private isOpen: boolean = false;

  constructor() {
    super();
    // Create the setup button
    this.setupButton = createButton();
    this.setupButton.id = "setupButton";
    this.setupButton.className = "greenBox";
    this.setupButton.appendChild(createImage("assets/icons/gear.png"));
    this.setupButton.onclick = () => {
      this.isOpen ? this.closeSetup() : this.openSetup();
    };

    // Create the setup popup
    this.popup = createPopup();
    this.popup.appendChild(createLabel("Setup data"));
    //this.popup.appendChild(this.loginComponent.view);

    this.Add(this.setupButton);
  }

  private openSetup() {
    this.Add(this.popup, false);
    this.isOpen = true;
  }

  private closeSetup() {
    this.Remove(this.popup);
    this.isOpen = false;
  }
}
