import { createBox } from "../elements/box";
import { createLabel } from "../elements/label";
import { createTeacherBox } from "../elements/teacherBox";
import { teacherStore } from "../store/teacherStore";

// SearchList component
export class SearchListComponent {
  private box: HTMLElement;
  private items: HTMLDivElement[] = [];

  public get view(): HTMLElement {
    return this.box;
  }

  constructor() {
    // Create the upload data form
    this.box = createBox("searchList");
    this.box.appendChild(createLabel("Search teacher"));

    this.loadTeacherData();
    teacherStore.on(() => this.loadTeacherData());
  }

  private loadTeacherData() {
    // Clear the box first
    for (let i = this.items.length - 1; i >= 0; i--) {
      this.box.removeChild(this.items[i]);
    }
    this.items = [];

    // Load the teacher data
    for (let teacher of teacherStore.GetData()) {
      const teacherBox = createTeacherBox(teacher);
      this.box.appendChild(teacherBox);
      this.items.push(teacherBox);
    }
  }
}
