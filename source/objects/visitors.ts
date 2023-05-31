import { Container } from "pixi.js";
import { Teacher } from "./teacher";
import { teacherStore } from "../store/teacherStore";

export class Visitors extends Container {
  public teachers: Teacher[] = [];
  //public students: Student[] = [];

  constructor() {
    super();

    // Add teachers
    this.loadTeacher();
    teacherStore.on(() => this.loadTeacher());
  }

  public loadTeacher() {
    // Remove old teachers
    for (let i = this.teachers.length - 1; i >= 0; i--) {
      this.teachers[i].destroy();
      this.removeChild(this.teachers[i]);
    }
    this.teachers = [];

    // Load new teachers
    const teachers = teacherStore.GetData();
    for (let teacher of teachers) {
      let sprite = new Teacher(teacher);
      //sprite.pivot = new Point(-200, -800);
      this.addChild(sprite);
      this.teachers.push(sprite);
    }
  }
}
