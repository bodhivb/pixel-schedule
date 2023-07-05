import { Assets } from "pixi.js";
import { ITeacher } from "../interfaces/teacher/teacherInterface";
import { DataStore } from "./dataStore";

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

    for (let name of teachers) {
      teacherData.push({
        firstName: name,
        imageKey: name,
        imagePath: `assets/teachers/${name}.png`,
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
