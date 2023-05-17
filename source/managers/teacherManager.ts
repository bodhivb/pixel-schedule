import { ITeacher } from "../interfaces/teacher/teacherInterface";

/** Teacher Manager */
export class TeacherManager {
  // Private constructor to prevent instantiation
  private constructor() {}

  private static currentTeachers: ITeacher[] = [];
  public static updateTeacher: () => void;

  /** Get teachers */
  public static get teachers() {
    if (TeacherManager.currentTeachers.length == 0) {
      // Load teachers from local storage
      const teachers = localStorage.getItem("teachers");
      if (teachers) {
        TeacherManager.currentTeachers = JSON.parse(teachers);
        if (TeacherManager.updateTeacher) TeacherManager.updateTeacher();
      }
    }

    return TeacherManager.currentTeachers;
  }

  /** Set teachers */
  public static SetTeachers(teachers: ITeacher[]) {
    this.currentTeachers = teachers;
    localStorage.setItem("teachers", JSON.stringify(teachers));
    if (this.updateTeacher) this.updateTeacher();
  }
}
