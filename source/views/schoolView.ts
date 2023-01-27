import { Cache, Graphics, Texture } from "pixi.js";
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
    super({ name: "School" });

    this.LoadSchool();

    let bodhi = new Teacher(Cache.get("bodhi"));
    this.addChild(bodhi);

    //Add ground floor
    const graphics = new Graphics();
    graphics.beginFill(0x292929);
    graphics.drawRect(190, 800, 1000, 3);
    graphics.endFill();

    this.addChild(graphics);
  }

  public LoadSchool() {
    //Sample data - for testing
    let school = this.GetData();

    let schoolBuilder = new SchoolBuilder();
    //schoolBuilder.SetFloor([0, 2, 3]);

    // Default texture
    schoolBuilder.SetWall(Cache.get("wall"));
    schoolBuilder.SetDoor(Cache.get("door"));
    schoolBuilder.SetFrontDoor(Cache.get("front_door"));

    // SintLucas texture
    schoolBuilder.SetFrontDoorSign(Cache.get("sintlucas_doorsign"));
    schoolBuilder.SetRoofSign(Cache.get("sintlucas_roofsign"));

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
