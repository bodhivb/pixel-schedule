import { createInputFile } from "../elements/inputFile";
import { createLabel } from "../elements/label";
import { isTeacher } from "../interfaces/teacher/teacherInterface";
import { teacherStore } from "../store/teacherStore";

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
    this.form.appendChild(createLabel("Upload the teacher data"));

    // Create the error label
    this.errorLabel = document.createElement("div");
    this.errorLabel.id = "errorLabel";
    this.form.appendChild(this.errorLabel);

    // Create the teacher data input field
    this.form.appendChild(createLabel("Teacher data"));
    const teacherInput = createInputFile((value) =>
      this.handleTeacherData(value)
    );
    this.form.appendChild(teacherInput);
  }

  /**
   * Handle the teacher data.
   * @param data teacher data interface
   * @returns
   */
  private handleTeacherData(data: any) {
    if (typeof data == "string") return;

    // Check if the data is correct
    if (Array.isArray(data) && data.length > 0 && isTeacher(data[0])) {
      teacherStore.SetData(data);
    }
  }
}
