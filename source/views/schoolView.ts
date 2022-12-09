import { Texture } from "pixi.js";
import { IRoom } from "../interfaces/roomInterface";
import { RoomType } from "../interfaces/roomType";
import { Room } from "../objects/room";
import { Teacher } from "../objects/teacher";
import { View } from "./view";

export class SchoolView extends View {
  test_classroom: IRoom = {
    number: "72a",
    type: RoomType.classroom,
  };

  constructor() {
    super("School");

    this.LoadSchool();

    let bodhi = new Teacher(Texture.from("assets/teachers/bodhi.png"));

    this.entities.push(bodhi);
    this.addChild(bodhi);
  }

  public LoadSchool() {
    //Sample data - for testing
    let school = this.GetData();

    for (let i = 0; i < school.length; i++) {
      let rooms = school[i].rooms;

      for (let r = 0; r < rooms.length; r++) {
        const newRoom = new Room(rooms[r], r);
        this.entities.push(newRoom);
        this.addChild(newRoom);
      }
    }
  }

  //This should be replaced with schedule API
  public GetData() {
    return [
      {
        floor: 0,
        rooms: [
          this.test_classroom,
          { number: "74", type: RoomType.classroom_window },
          { number: "75", type: RoomType.classroom },
        ],
      },
    ];
  }
}
