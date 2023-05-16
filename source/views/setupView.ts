import { HTMLView } from "./htmlView";
import { LoginComponent } from "../components/loginComponent";
import { createButton } from "../elements/button";
import { createPopup } from "../elements/popup";
import { createLabel } from "../elements/label";

export class SetupView extends HTMLView {
  private loginComponent: LoginComponent;

  private popup: HTMLElement;

  private setupButton: HTMLButtonElement;

  private isOpen: boolean = false;

  constructor() {
    super();

    this.loginComponent = new LoginComponent();
    this.loginComponent.view.classList.add("clickable");

    // Create the setup button
    this.setupButton = createButton("Setup data");
    this.setupButton.id = "setupButton";
    this.setupButton.className = "greenBox";
    this.setupButton.onclick = () => {
      this.isOpen ? this.closeSetup() : this.openSetup();
    };

    // Create the setup popup
    this.popup = createPopup();

    this.popup.appendChild(createLabel("Setup data"));
    this.popup.appendChild(this.loginComponent.view);

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
