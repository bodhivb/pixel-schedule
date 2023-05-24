import { HTMLView } from "./htmlView";
import { LoginComponent } from "../components/loginComponent";
import { createButton } from "../elements/button";
import { createPopup } from "../elements/popup";
import { createLabel } from "../elements/label";
import { UploadDataComponent } from "../components/uploadDataComponent";
import { createImage } from "../elements/image";

export class SetupView extends HTMLView {
  private loginComponent: LoginComponent;
  private uploadDataComponent: UploadDataComponent;

  private popup: HTMLElement;

  private setupButton: HTMLButtonElement;

  private isOpen: boolean = false;

  constructor() {
    super();

    this.loginComponent = new LoginComponent();
    this.loginComponent.view.classList.add("clickable");

    const spaceLine = document.createElement("div");
    spaceLine.id = "spaceLine";
    spaceLine.appendChild(createLabel("or"));

    this.uploadDataComponent = new UploadDataComponent();
    this.uploadDataComponent.view.classList.add("clickable");

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

    const setupData = document.createElement("div");
    setupData.style.display = "flex";

    setupData.appendChild(this.loginComponent.view);
    setupData.appendChild(spaceLine);
    setupData.appendChild(this.uploadDataComponent.view);

    this.popup.appendChild(setupData);

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
