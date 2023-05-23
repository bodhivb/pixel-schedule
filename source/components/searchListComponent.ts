import { createBox } from "../elements/box";
import { createLabel } from "../elements/label";
import { createTeacherBox } from "../elements/teacherBox";
import { TeacherManager } from "../managers/teacherManager";

// SearchList component
export class SearchListComponent {
  private box: HTMLElement;

  public get view(): HTMLElement {
    return this.box;
  }

  constructor() {
    // Create the upload data form
    this.box = createBox("searchList");
    this.box.classList.add("clickable");
    this.box.appendChild(createLabel("Search teacher"));

    for (let teacher of TeacherManager.teachers) {
      const teacherBox = createTeacherBox(teacher);
      this.box.appendChild(teacherBox);
    }
  }
}
