import { Texture } from "pixi.js";
import { SchoolBuilder } from "../builders/schoolBuilder";
import { IRoom } from "../interfaces/roomInterface";
import { RoomType } from "../interfaces/roomType";
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

    let schoolBuilder = new SchoolBuilder();
    //schoolBuilder.SetFloor([0, 2, 3]);

    // Default texture
    schoolBuilder.SetWall(Texture.from("assets/buildings/wall.png"));
    schoolBuilder.SetDoor(Texture.from("assets/buildings/door.png"));
    schoolBuilder.SetFrontDoor(Texture.from("assets/buildings/front_door.png"));

    // SintLucas texture
    schoolBuilder.SetFrontDoorSign(
      Texture.from("assets/buildings/sintlucas_doorsign.png")
    );
    schoolBuilder.SetRoofSign(
      Texture.from("assets/buildings/sintlucas_roofsign.png")
    );

    for (let i = 0; i < school.length; i++) {
      let rooms = school[i].rooms;
      for (let r = 0; r < rooms.length; r++) {
        schoolBuilder.AddRoom(school[i].floor, rooms[r]);
      }
    }

    const s = schoolBuilder.GetProduct();

    s.x = 200;
    s.y = 800;
    this.addChild(s);
    console.log("school added");
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
        ],
      },
    ];
  }
}
