import { createInputFile } from "../elements/inputFile";
import { createLabel } from "../elements/label";

// UploadData component
export class UploadDataComponent {
  private form: HTMLFormElement;
  private errorLabel: HTMLElement;

  public get view(): HTMLElement {
    return this.form;
  }

  constructor() {
    // Create the upload data form
    this.form = document.createElement("form");
    this.form.id = "uploadDataForm";
    this.form.appendChild(createLabel("Upload the local data"));

    // Create the error label
    this.errorLabel = document.createElement("div");
    this.errorLabel.id = "errorLabel";
    this.form.appendChild(this.errorLabel);

    // Create the rooster data input field
    this.form.appendChild(createLabel("Rooster data"));
    const roosterInput = createInputFile((value) => {
      console.log(value);
      console.log(typeof value == "string");
    });
    this.form.appendChild(roosterInput);

    // Create the teacher data input field
    this.form.appendChild(createLabel("Teacher data"));
    const teacherInput = createInputFile((value) => console.log(value));
    this.form.appendChild(teacherInput);
  }
}
