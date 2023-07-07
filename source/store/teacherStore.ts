import { Assets } from "pixi.js";
import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { DataStore } from "./dataStore";
import { LinkTeacherData } from "../constants/linkTeacherData";

/** Teacher Store */
class TeacherStore extends DataStore<ITeacher[]> {
  constructor() {
    super("teachers");
  }

  // Must be called after assets are loaded!
  public async resetToDefaultData() {
    const teacherAssets = await Assets.loadBundle("teachers");
    const teachers = Object.keys(teacherAssets);

    const teacherData: ITeacher[] = [];

    const linkIds = LinkTeacherData;

    for (let imageKey of teachers) {
      const id = linkIds.find((e) => e.imageKey == imageKey)?.teacherId;

      teacherData.push({
        id,
        imageKey,
        imagePath: `assets/teachers/${imageKey}.png`,
      });
    }

    this.SetData(teacherData);
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
