import { IXeduleClassroom } from "../interfaces/xedule/xeduleClassroom";
import { XeduleApi } from "./xeduleApi";

class ClassroomApi extends XeduleApi<IXeduleClassroom> {
  constructor() {
    super("Attendee/Type/Classroom");
  }
}

export const classroomApi = new ClassroomApi();
