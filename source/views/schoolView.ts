import { Cache, Graphics } from "pixi.js";
import { Director } from "../builders/director";
import { SchoolBuilder } from "../builders/schoolBuilder";
import { IFloor } from "../interfaces/floorInterface";
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
    // Sample data - for testing
    const data = this.GetData();

    const schoolBuilder = new SchoolBuilder();
    const director = new Director(schoolBuilder);

    // The director will only give correct orders to builders
    director.buildSintLucas(data);

    const school = schoolBuilder.GetProduct();
    school.x = 200;
    school.y = 800;
    this.addChild(school);
  }

  //This should be replaced with schedule API
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
}
