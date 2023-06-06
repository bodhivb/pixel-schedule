import { Cache, Resource, Sprite, Texture } from "pixi.js";
import { GET_BUILDING_PIXEL } from "../interfaces/constants";
import { Room } from "./room";

export class Floor {
  public elevator?: Sprite;
  public doorTexture: Texture<Resource>;

  // Hallway door
  public doors: Sprite[];
  // Rooms on this floor
  public rooms: Room[];

  constructor() {
    this.rooms = [];
    this.doors = [];

    this.doorTexture = Cache.get("door");
  }

  public GetFloorWidth() {
    let size: number = 0;

    // Jump into the start position of the build
    size += GET_BUILDING_PIXEL.WALL_WIDTH;

    // Does the floor have an elevator? Add this length
    if (this.elevator) {
      size += this.elevator.width;
      size += this.doorTexture?.width ?? 0;
    }

    for (const room of this.rooms) {
      // Add room and door length
      size += room.width;
      size += this.doorTexture?.width ?? 0;
    }

    return size;
  }
}
