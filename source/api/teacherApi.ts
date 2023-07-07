import { IXeduleTeacher } from "../interfaces/xedule/xeduleTeacher";
import { XeduleApi } from "./xeduleApi";

export class TeacherApi extends XeduleApi<IXeduleTeacher> {
  constructor() {
    super("Attendee/Type/Teacher");
  }
}
