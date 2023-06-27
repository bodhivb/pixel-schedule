import { IXeduleTeacher } from "../interfaces/xedule/xeduleTeacher";
import { XeduleApi } from "./xeduleApi";

class TeacherApi extends XeduleApi<IXeduleTeacher> {
  constructor() {
    super("Attendee/Type/Teacher");
  }
}

export const teacherApi = new TeacherApi();
