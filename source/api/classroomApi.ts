import { IXeduleClassroom } from "../interfaces/xedule/xeduleClassroom";
import { XeduleApi } from "./xeduleApi";

export class ClassroomApi extends XeduleApi<IXeduleClassroom> {
  constructor() {
    super("Attendee/Type/Classroom");
  }
}
