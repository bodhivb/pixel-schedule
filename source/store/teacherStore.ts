import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { DataStore } from "./dataStore";

/** Teacher Store */
class TeacherStore extends DataStore<ITeacher[]> {
  constructor() {
    super("teachers");
  }
}

export const teacherStore = new TeacherStore();
