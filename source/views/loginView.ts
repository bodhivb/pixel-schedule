import { HTMLView } from "./htmlView";
import { LoginComponent } from "../components/loginComponent";
import { authenticationService } from "../services/authenticationService";
import { createPopup } from "../elements/popup";

export class LoginView extends HTMLView {
  private popup: HTMLElement;
  private loginComponent: LoginComponent;
  private isOpen: boolean = false;

  constructor() {
    super();

    this.loginComponent = new LoginComponent();
    this.loginComponent.view.classList.add("clickable");

    // Create the setup popup
    this.popup = createPopup();
    this.popup.appendChild(this.loginComponent.view);

    // Open the login popup if user is not logged in
    this.openSetupIfNotLoggedIn();
  }

  private async openSetupIfNotLoggedIn() {
    const isLoggedIn = await authenticationService.isLoggedIn();
    if (!isLoggedIn && !this.isOpen) this.openLogin();
  }

  private openLogin() {
    this.Add(this.popup, false);
    this.isOpen = true;
  }

  private closeLogin() {
    this.Remove(this.popup);
    this.isOpen = false;
  }
}
