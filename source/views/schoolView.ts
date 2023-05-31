import { Graphics, Point } from "pixi.js";
import { Director } from "../builders/director";
import { SchoolBuilder } from "../builders/schoolBuilder";
import { IFloor } from "../interfaces/floorInterface";
import { IRoom } from "../interfaces/roomInterface";
import { RoomType } from "../interfaces/roomType";
import { School } from "../objects/school";
import { View } from "./view";
import { Visitors } from "../objects/visitors";

export class SchoolView extends View {
  private school: School;
  private visitors: Visitors;

  test_classroom: IRoom = {
    number: "72a",
    type: RoomType.classroom,
  };

  constructor(worldPosition: Point = new Point(200, 800)) {
    super({ name: "School" });

    // Add school
    this.school = this.LoadSchool();
    //xthis.school.position = worldPosition;
    this.addChild(this.school);

    this.visitors = new Visitors();
    //this.teacherGroup.position = worldPosition;
    this.position = worldPosition;

    // Add ground floor
    const graphics = new Graphics();
    graphics.beginFill(0x292929);
    graphics.drawRect(190, 800, 1000, 3);
    graphics.endFill();

    this.addChild(graphics);
  }

  public LoadSchool() {
    // Sample data - for testing
    const data = this.GetData();

    const schoolBuilder = new SchoolBuilder();
    const director = new Director(schoolBuilder);

    // The director will only give correct orders to builders
    director.buildSintLucas(data);

    const school = schoolBuilder.GetProduct();
    return school;
  }

  // This should be replaced with schedule API
  public GetData(): IFloor[] {
    return [
      {
        floor: 0,
        rooms: [
          this.test_classroom,
          { number: "74", type: RoomType.classroom_window },
          { number: "75", type: RoomType.classroom_window },
          { number: "76", type: RoomType.classroom },
        ],
      },
      {
        floor: 2,
        rooms: [
          this.test_classroom,
          { number: "32", type: RoomType.classroom_Large },
          { number: "33", type: RoomType.classroom_window },
        ],
      },
      {
        floor: 3,
        rooms: [
          { number: "32", type: RoomType.classroom_window },
          { number: "33", type: RoomType.classroom },
          { number: "37", type: RoomType.networking_plaza },
        ],
      },
    ];
  }

  /**
   * Put the teacher in the room.
   */
  public SetTeacherIntoRoom() {
    for (let teacher of this.visitors.teachers) {
      // Find the room
      const room = this.school.GetRoomByName("Netwerkplein");
      if (room) {
        console.log("ROom found");

        console.log(teacher.position);
        console.log(room.position);
        // Put the teacher in the room
        teacher.SetTarget(room.position);
      }
    }
  }
}
