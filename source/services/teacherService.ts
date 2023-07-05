import { TeacherApi } from "../api/teacherApi";
import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { teacherStore } from "../store/teacherStore";
import { BaseService } from "./baseService";

class TeacherService extends BaseService<TeacherApi> {
  constructor() {
    super(new TeacherApi());

    // TODO: Check first if user is authenticated
    // Then fetch the teachers
    //this.fetchTeachers();
  }

  public async fetchTeachers() {
    const result = await this.api.get();

    let teacher: ITeacher[] = Object.assign([], teacherStore.GetData());
    let isChanged = false;

    for (let data of result) {
      if (!data.firstName || !data.lastName) continue;

      const fName = data.firstName.toLowerCase();
      const lName = data.lastName.toLowerCase();

      const match = teacher.findIndex(
        (e) =>
          e.id == data.id &&
          (e.firstName?.toLowerCase() != fName ||
            e.lastName?.toLowerCase() != lName)
      );

      if (match >= 0) {
        teacher[match].firstName = fName;
        teacher[match].lastName = lName;
        isChanged = true;
      }
    }

    if (isChanged) teacherStore.SetData(teacher);
  }
}

export const teacherService = new TeacherService();
