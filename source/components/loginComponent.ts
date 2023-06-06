import axios from "axios";
import { createInput } from "../elements/input";
import { createLabel } from "../elements/label";
import { authenticationApi } from "../api/authenticationApi";

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
    this.form.appendChild(createLabel("Log in to retrieve the data"));

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

      await authenticationApi.authentication({
        username: formData.get("email")?.toString() ?? "",
        password: formData.get("password")?.toString() ?? "",
      });

      /*
      const res = await axios.post("http://localhost:3000/xedule", {
        username: formData.get("email"),
        password: formData.get("password"),
      });

      if (res.data.token) {
        // Save the token
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      } else {
        this.errorLabel.innerHTML = "Unexpected error, please try again later.";
      }
      */
    } catch (ex) {
      // Error handling
      if (axios.isAxiosError(ex)) {
        this.errorLabel.innerHTML = ex.response?.data.message ?? ex.message;
      } else {
        this.errorLabel.innerHTML = "Unexpected error: " + (ex as string);
      }
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
