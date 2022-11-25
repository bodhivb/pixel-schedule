import { createTextField } from "../elements/textField";
import { HTMLView } from "./htmlView";

export class LoginView extends HTMLView {
  private readonly form: HTMLFormElement;

  constructor() {
    super();

    // Create a login form using html
    this.form = document.createElement("form");
    this.form.addEventListener("submit", (event) => this.Submit(event));

    this.form.appendChild(createTextField("email"));
    this.form.appendChild(createTextField("password"));

    this.form.appendChild(this.createSubmitButton());

    this.Add(this.form);
  }

  Submit(event: SubmitEvent) {
    // Prevent default, such as reloading the page
    event.preventDefault();

    console.log("Submit...");
    const formData = new FormData(this.form);
    console.log(formData.get("email"));
    console.log(formData.get("password"));

    this.form.innerHTML = "";
  }

  private createSubmitButton() {
    let button = document.createElement("input");
    button.type = "submit";
    button.value = "Aanmelden";
    return button;
  }
}
