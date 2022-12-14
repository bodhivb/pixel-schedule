import { Resource, Texture, TilingSprite } from "pixi.js";
import { IRoom } from "../interfaces/roomInterface";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import { Entity } from "../objects/entity";
import { Room } from "../objects/room";
import { School } from "../objects/school";

// WIP
export class SchoolBuilder {
  private school: School = new School();
  private wallTexture?: Texture<Resource>;

  public Reset() {
    this.school = new School();
  }

  public GetProduct(): School {
    // Add wall to finish the building
    if (this.wallTexture) {
      const wall = new TilingSprite(this.wallTexture, 100, 100);
      wall.zIndex = SortingLayer.Midground;
    }

    //Apply the roof sign to the roof

    const result = this.school;
    this.Reset();
    return result;
  }

  /** Set floor for a building. */
  public SetFloor(floorList: number[]) {
    this.school.floors = [];
    this.AddFloor(...floorList);
  }

  /** Add floor(s) to the building. */
  public AddFloor(...numbers: number[]) {
    for (let floor of numbers) {
      this.school.floors.push({ floor: floor, rooms: [] });
    }
  }

  /**
   * Build a room on the selected floor.
   * This function automatically creates a new floor if it does not exist.
   * @param floorNumber
   */
  public SetRoom(floorNumber: number, room: IRoom) {
    for (let f of this.school.floors) {
      if (f.floor === floorNumber) {
        f.rooms.push(room);
        return;
      }
    }

    // If there is no floor, add it to the new floor.
    this.school.floors.push({ floor: floorNumber, rooms: [room] });
  }

  /** Set the texture on the background of the building */
  public SetWall(texture: Texture<Resource>) {
    this.wallTexture = texture;
  }

  /** Set the door at the entrance to the building */
  public SetDoor(texture: Texture<Resource>) {
    this.school.door = new Entity(texture);
    this.school.door.anchor.set(1, 1);
    this.school.door.zIndex = SortingLayer.Midground;
    this.school.addChild(this.school.door);
  }

  /** Set the roof sign on the building */
  public SetRoofSign(texture: Texture<Resource>) {
    this.school.roofSign = new Entity(texture);
    this.school.roofSign.anchor.set(0, 1);
    this.school.roofSign.zIndex = SortingLayer.Midground;
    this.school.addChild(this.school.roofSign);
  }
}
