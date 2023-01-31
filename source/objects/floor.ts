import { Cache, Resource, Sprite, Texture } from "pixi.js";
import { FloorBuilder } from "../builders/floorBuilder";
import { Room } from "./room";

export class Floor {
  public elevator?: Sprite;
  public doorTexture: Texture<Resource>;

  //Hallway door
  public doors: Sprite[];
  public rooms: Room[];

  constructor() {
    this.rooms = [];
    this.doors = [];

    this.doorTexture = Cache.get("door");
  }

  public GetFloorWidth() {
    let size: number = 0;
    let isFirstRoom: boolean = true;

    // Does the floor have an elevator? Add this length.
    if (this.elevator) {
      size += this.elevator.width;
      size += this.doorTexture?.width ?? 0;
    }

    for (const room of this.rooms) {
      size += room.width;
      // Does the room have a previous room? Add door length.
      if (isFirstRoom) {
        isFirstRoom = false;
      } else {
        size += this.doorTexture?.width ?? 0;
      }
    }

    return size;
  }
}
