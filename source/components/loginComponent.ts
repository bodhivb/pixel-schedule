import { createInput } from "../elements/input";
import { createLabel } from "../elements/label";
import { authenticationService } from "../services/authenticationService";

// Login component
export class LoginComponent {
  private form: HTMLFormElement;
  private errorLabel: HTMLElement;

  public get view(): HTMLElement {
    return this.form;
  }

  constructor() {
    // Create the login form
    this.form = document.createElement("form");
    this.form.id = "loginForm";
    this.form.appendChild(createLabel("Log in to retrieve the schedule data"));

    // Add the submit event
    this.form.addEventListener("submit", (event) => this.Submit(event));

    // Create the error label
    this.errorLabel = document.createElement("div");
    this.errorLabel.id = "errorLabel";
    this.form.appendChild(this.errorLabel);

    // Create the input fields
    this.form.appendChild(
      createInput("email", "iemand@example.com", "username")
    );
    this.form.appendChild(
      createInput("password", "Wachtwoord", "current-password")
    );

    // Create the submit button
    this.form.appendChild(this.createSubmitButton());
  }

  async Submit(event: SubmitEvent) {
    // Prevent default, such as reloading the page
    event.preventDefault();

    // Get the form data first (before disabling the form)
    const formData = new FormData(this.form);

    // Disable the form
    this.setEnabledForm(false);

    // Send the form data to the server
    try {
      this.errorLabel.innerHTML = "";

      const isSuccessful = await authenticationService.login(
        formData.get("email")?.toString() ?? "",
        formData.get("password")?.toString() ?? ""
      );

      if (isSuccessful) {
        window.location.reload();
      } else {
        this.errorLabel.innerHTML = "Unexpected error (21)";
      }
    } catch (ex) {
      this.errorLabel.innerHTML = (ex as string) ?? "Unexpected error (22)";
    }

    this.setEnabledForm(true);
  }

  private setEnabledForm(enable: boolean) {
    for (let i = 0; i < this.form.elements.length; i++) {
      const element = this.form.elements[i] as HTMLInputElement;
      element.disabled = !enable;
    }
  }

  private createSubmitButton() {
    let button = document.createElement("input");
    button.type = "submit";
    button.value = "Aanmelden";
    return button;
  }
}
