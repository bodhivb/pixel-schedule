import { Resource, Texture, TilingSprite } from "pixi.js";
import { IRoom } from "../interfaces/roomInterface";
import { IRoomType } from "../interfaces/roomTypeInterface";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import { Entity } from "../objects/entity";
import { School } from "../objects/school";

export class SchoolBuilder {
  // Builder output
  private school: School = new School();

  // Base building texture pack
  private wallTexture?: Texture<Resource>;
  private doorTexture?: Texture<Resource>;
  private frontDoorTexture?: Texture<Resource>;

  public Reset() {
    this.school = new School();
  }

  public GetProduct(): School {
    // Add wall to finish the building
    if (this.wallTexture) {
      const wall = new TilingSprite(
        this.wallTexture,
        this.school.GetSchoolWidth,
        this.school.GetSchoolHeight
      );
      wall.zIndex = SortingLayer.Background;
      wall.anchor.set(0, 1);
      this.school.addChild(wall);
    }

    // Apply the front door to the building
    if (this.frontDoorTexture) {
      const frontDoor = new Entity(this.frontDoorTexture);
      frontDoor.anchor.set(0, 1);
      this.school.addChild(frontDoor);
    }

    // Apply the roof sign to the roof
    if (this.school.roofSign) {
      this.school.roofSign.y = -this.school.GetSchoolHeight;
    }

    let floorNumber = 0;
    for (let floor of this.school.floors) {
      let roomNumber = 0;
      for (let room of floor.rooms) {
        const newRoom = new Entity(this.GetRoomTexture(room.type));
        newRoom.anchor.set(0, 1);
        newRoom.x =
          roomNumber * (this.school.GetRoomWidth + this.school.GetWallSize) +
          this.school.GetWallSize;
        newRoom.y = -(floorNumber * this.school.GetFloorHeight);
        this.school.addChild(newRoom);

        // If the room has an adjoining room? Place a door
        if (roomNumber > 0) {
          const newDoor = new Entity(this.doorTexture);
          newDoor.anchor.set(0, 1);
          newDoor.x =
            roomNumber * (this.school.GetRoomWidth + this.school.GetWallSize);
          newDoor.y = -(floorNumber * this.school.GetFloorHeight);
          this.school.addChild(newDoor);
        }

        roomNumber++;
      }
      floorNumber++;
    }

    const result = this.school;
    this.Reset();
    return result;
  }

  private GetRoomTexture(type: IRoomType) {
    return Texture.from("assets/" + type.url);
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
   * @param room
   */
  public AddRoom(floorNumber: number, room: IRoom) {
    for (let f of this.school.floors) {
      if (f.floor === floorNumber) {
        f.rooms.push(room);
        return;
      }
    }

    // If there is no floor, add it to the new floor.
    this.school.floors.push({ floor: floorNumber, rooms: [room] });
  }

  /**
   * Set room(s) on the selected floor.
   * This function automatically creates a new floor if it does not exist.
   * @param floorNumber
   */
  public SetRoom(floorNumber: number, rooms: IRoom[]) {
    for (let f of this.school.floors) {
      if (f.floor === floorNumber) {
        f.rooms = rooms;
        return;
      }
    }

    // If there is no floor, add it to the new floor.
    this.school.floors.push({ floor: floorNumber, rooms });
  }

  /** Set the texture on the background of the building */
  public SetWall(texture: Texture<Resource>) {
    this.wallTexture = texture;
  }

  /** Set the door texture for the building */
  public SetDoor(texture: Texture<Resource>) {
    this.doorTexture = texture;
  }

  /** Set the front door texture for the building */
  public SetFrontDoor(texture: Texture<Resource>) {
    this.frontDoorTexture = texture;
  }

  /** Set the signboard at the entrance to the building */
  public SetFrontDoorSign(texture: Texture<Resource>) {
    //TODO add check if already in use
    this.school.doorSign = new Entity(texture);
    this.school.doorSign.anchor.set(1, 1);
    this.school.doorSign.zIndex = SortingLayer.Midground;
    this.school.addChild(this.school.doorSign);
  }

  /** Set the roof sign on the building */
  public SetRoofSign(texture: Texture<Resource>) {
    //TODO add check if already in use
    this.school.roofSign = new Entity(texture);
    this.school.roofSign.anchor.set(0, 1);
    this.school.roofSign.zIndex = SortingLayer.Midground;
    this.school.addChild(this.school.roofSign);
  }

  public AddEntity(link: Entity, texture: Texture<Resource>) {
    this.school.addChild(link);
  }
}
