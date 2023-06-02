import { Container, Sprite, TilingSprite } from "pixi.js";
import { GET_BUILDING_PIXEL } from "../interfaces/constants";
import { Floor } from "./floor";

export class School extends Container {
  //name: string;       // Example: SintLucas
  //location: string;   // Example: Eindhoven

  // School entity
  public doorSign?: Sprite;
  public frontDoor?: Sprite;
  public roofSign?: Sprite;
  public wall?: TilingSprite;

  // School floors with rooms
  public floors: Map<number, Floor> = new Map<number, Floor>();

  constructor() {
    super();
    this.sortableChildren = true;
  }

  /** Find a room by name. */
  GetRoomByName(name: string) {
    for (let floor of this.floors.values()) {
      for (let room of floor.rooms) {
        if (room.name == name) {
          return room;
        }
      }
    }
    return null;
  }

  /** find a room by number. */
  GetRoomByNumber(number: string) {
    for (let floor of this.floors.values()) {
      for (let room of floor.rooms) {
        if (room.number == number) {
          return room;
        }
      }
    }
    return null;
  }

  /** Get the number of floors of a school. */
  get GetAmountOfFloor() {
    return this.floors.size;
  }

  /** Get height of the school in pixels. */
  get GetSchoolHeight() {
    return this.GetAmountOfFloor * this.GetFloorHeight;
  }

  /** Get width of the school in pixels. */
  get GetSchoolWidth() {
    let schoolWidth: number = 0;

    // Find which floor is the largest
    for (let floor of this.floors.values()) {
      const width = floor.GetFloorWidth();
      if (width > schoolWidth) {
        schoolWidth = width;
      }
    }

    return schoolWidth;
  }

  /** Get height of the storey in pixels. */
  get GetFloorHeight() {
    return this.GetPlatformSize + this.GetRoomHeight;
  }

  /** Get height of the default classroom in pixels. */
  get GetRoomHeight() {
    return GET_BUILDING_PIXEL.ROOM_HEIGHT;
  }

  /** Get width of the default classroom in pixels. */
  get GetRoomWidth() {
    return GET_BUILDING_PIXEL.ROOM_WIDTH;
  }

  /** Get width of the default wall in pixels. */
  get GetWallSize() {
    return GET_BUILDING_PIXEL.WALL_WIDTH;
  }

  /** Get height of the default platform in pixels. */
  get GetPlatformSize() {
    return GET_BUILDING_PIXEL.WALL_HEIGHT;
  }
}
