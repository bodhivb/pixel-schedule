import { Cache, Sprite } from "pixi.js";
import { GET_BUILDING_PIXEL } from "../interfaces/constants";
import { IRoom } from "../interfaces/roomInterface";
import { IRoomType } from "../interfaces/roomTypeInterface";
import { Floor } from "../objects/floor";
import { Room } from "../objects/room";

export class FloorBuilder {
  // Builder output
  private height: number;
  private number: number;
  private floor: Floor;

  /**
   * @param floorHeight The floor height is required to place the room at the correct height.
   * @param floor Give empty parameter will create a new blank floor. Or fill in the parameter to continue building or adjusting.
   * @param floorNumber This variable can be displayed as a floor number. If not filled in, then the value is floor height.
   */
  constructor(floorHeight: number, floor?: Floor, floorNumber?: number) {
    this.height = floorHeight;
    this.number = floorNumber ?? floorHeight;
    this.floor = floor ?? new Floor();
  }

  public GetFloor() {
    return this.floor;
  }

  public GetPixelHeight() {
    return (
      this.height *
      (GET_BUILDING_PIXEL.ROOM_HEIGHT + GET_BUILDING_PIXEL.WALL_HEIGHT)
    );
  }

  /** Add room(s) to the current floor. */
  public AddRoom(...rooms: IRoom[]) {
    for (let data of rooms) {
      const room = new Room(data);
      room.x = this.floor.GetFloorWidth();
      room.y = this.GetPixelHeight();

      this.floor.rooms.push(room);
    }
  }

  //Door
  public SetHallway() {
    let xPos: number = 0;
    let isFirstRoom: boolean = true;

    this.floor.doors = [];

    for (let room of this.floor.rooms) {
      xPos += room.width;
      // If the room has an adjoining room? Place a door.
      if (isFirstRoom) {
        isFirstRoom = false;
      } else {
        this.AddDoor(xPos);
        xPos += this.floor.doorTexture?.width ?? 0;
      }
    }
  }

  private AddDoor(xPos: number) {
    const newDoor = new Sprite(this.floor.doorTexture);
    newDoor.anchor.set(0, 1);
    newDoor.x = xPos;
    newDoor.y = this.GetPixelHeight();
    this.floor.doors.push(newDoor);
  }

  /** Set rooms to the current floor. */
  public SetRoom(rooms: IRoom[]) {
    this.floor.rooms = [];
    this.AddRoom(...rooms);
  }

  private GetRoomTexture(type: IRoomType) {
    return Cache.get(type.asset);
  }
}
