import { Container, Resource, Sprite, Texture, TilingSprite } from "pixi.js";
import { GET_BUILDING_PIXEL } from "../interfaces/constants";
import { IRoom } from "../interfaces/roomInterface";
import { Floor } from "../objects/floor";
import { Room } from "../objects/room";

export class FloorBuilder {
  // Builder output
  private floor: Floor;

  private height: number;
  private number: number;
  private container?: Container;

  /**
   * Recommend calling SetContainer first after this to save all sprites into the layer that is displayed.
   * @param floorHeight The floor height is required to place the room at the correct height.
   * @param floor Give empty parameter will create a new blank floor. Or fill in the parameter to continue building or adjusting.
   * @param floorNumber This variable can be displayed as a floor number. If not filled in, then the value is floor height.
   */
  constructor(floorHeight: number, floor?: Floor, floorNumber?: number) {
    this.height = floorHeight;
    this.number = floorNumber ?? floorHeight;
    this.floor = floor ?? new Floor();
  }

  public SetContainer(container: Container) {
    this.container = container;
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
      room.y = -this.GetPixelHeight();

      this.floor.rooms.push(room);
      this.AddEntity(room);
    }
  }

  /** Place each door between rooms. */
  public SetHallway() {
    let xPos: number = 0;
    let isFirstRoom: boolean = true;
    this.floor.doors = [];

    // Jump into the start position of the build
    xPos += GET_BUILDING_PIXEL.WALL_WIDTH;

    // Does the floor have an elevator? Add this length
    if (this.floor.elevator) {
      xPos += this.floor.elevator.width;
      xPos += this.floor.doorTexture?.width ?? 0;
    }

    for (let room of this.floor.rooms) {
      // If the room has an adjoining room? Place a door
      if (isFirstRoom) {
        isFirstRoom = false;
      } else {
        this.AddDoor(xPos);
        xPos += this.floor.doorTexture?.width ?? 0;
      }
      xPos += room.width;
    }
  }

  private AddDoor(xPos: number) {
    const newDoor = new Sprite(this.floor.doorTexture);
    newDoor.anchor.set(0, 1);
    newDoor.x = xPos;
    newDoor.y = -this.GetPixelHeight();
    this.floor.doors.push(newDoor);
    this.AddEntity(newDoor);
  }

  /** Set rooms to the current floor. */
  public SetRoom(rooms: IRoom[]) {
    this.floor.rooms = [];
    this.AddRoom(...rooms);
  }

  /** Place the elevator at the beginning of the floor. */
  public SetElevator(texture: Texture<Resource>) {
    this.floor.elevator = new Sprite(texture);
    this.floor.elevator.anchor.set(0, 1);
    this.floor.elevator.x = GET_BUILDING_PIXEL.WALL_WIDTH;
    this.floor.elevator.y = -this.GetPixelHeight();
    this.AddDoor(this.floor.elevator.x + this.floor.elevator.width);
    this.AddEntity(this.floor.elevator);
  }

  /** Set the door texture for the hallway. */
  public SetDoor(texture: Texture<Resource>) {
    this.floor.doorTexture = texture;
  }

  /** Add child(s) to the container if it exists. */
  public AddEntity(...children: Sprite[] | TilingSprite[]) {
    this.container?.addChild(...children);
  }
}
