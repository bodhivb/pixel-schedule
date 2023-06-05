import { Graphics, Point } from "pixi.js";
import { Director } from "../builders/director";
import { SchoolBuilder } from "../builders/schoolBuilder";
import { IRoom } from "../interfaces/roomInterface";
import { RoomType } from "../interfaces/roomType";
import { School } from "../objects/school";
import { View } from "./view";
import { Teacher } from "../objects/teacher";
import { teacherStore } from "../store/teacherStore";
import { SintLucasSchoolData } from "../schoolData";

export class SchoolView extends View {
  private school: School;
  public teachers: Teacher[] = [];

  test_classroom: IRoom = {
    number: "72a",
    type: RoomType.classroom,
  };

  constructor(worldPosition: Point = new Point(200, 800)) {
    super({ name: "School" });
    this.position = worldPosition;

    // Add school
    this.school = this.LoadSchool();
    this.addChild(this.school);

    // Add teachers
    this.loadTeacher();
    teacherStore.on(() => this.loadTeacher());

    // Add ground floor
    const graphics = new Graphics();
    graphics.beginFill(0x292929);
    graphics.drawRect(-10, 0, this.school.GetSchoolWidth + 20, 3);
    graphics.endFill();

    this.addChild(graphics);
  }

  public LoadSchool() {
    // Sample data - for testing
    const data = SintLucasSchoolData;

    const schoolBuilder = new SchoolBuilder();
    const director = new Director(schoolBuilder);

    // The director will only give correct orders to builders
    director.buildSintLucas(data);

    const school = schoolBuilder.GetProduct();
    return school;
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

      if (teacher.firstName.charAt(0) == "B") {
        this.SetTeacherIntoRoom(sprite, "N.0.60");
      } else {
        this.SetTeacherIntoRoom(sprite, "N.0.74");
      }
    }
  }

  /**
   * Put the teacher in the room.
   */
  public SetTeacherIntoRoom(teacher: Teacher, roomNumber: string) {
    // Find the room
    const room = this.school.GetRoomByNumber(roomNumber);
    if (room) {
      // Walk teacher to the room
      teacher.SetTarget(
        new Point(room.position.x + room.width / 2, room.position.y),
        Math.max(25, room.width - 50)
      );
    }
  }
}
