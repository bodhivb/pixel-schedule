import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { DataStore } from "./dataStore";

/** Teacher Store */
class TeacherStore extends DataStore<ITeacher[]> {
  constructor() {
    super("teachers");
  }

  /** Get teachers data */
  public GetData(): ITeacher[] {
    const data = super.GetData();

    // Check if data is valid
    if (data.length) {
      return data;
    } else {
      return [];
    }
  }
}

export const teacherStore = new TeacherStore();
