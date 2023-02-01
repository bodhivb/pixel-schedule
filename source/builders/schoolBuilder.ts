import { Container, Resource, Sprite, Texture, TilingSprite } from "pixi.js";
import { SortingLayer } from "../interfaces/sortingLayerEnum";
import { School } from "../objects/school";
import { Floor } from "../objects/floor";

export class SchoolBuilder {
  // Builder output
  private school: School = new School();
  private isEntityChange = false;

  public Reset() {
    this.school = new School();
    this.isEntityChange = false;
  }

  public GetProduct(): School {
    if (this.isEntityChange) {
      this.OnSchoolFormatChange();
      this.isEntityChange = false;
    }

    const result = this.school;
    this.Reset();
    return result;
  }

  /** Call this function when the school size changes. */
  public OnSchoolFormatChange() {
    // Apply the wall position to the building
    if (this.school.wall) {
      this.school.wall.width = this.school.GetSchoolWidth;
      this.school.wall.height = this.school.GetSchoolHeight;
    }

    // Apply the roof sign to the roof
    if (this.school.roofSign) {
      this.school.roofSign.y = -this.school.GetSchoolHeight;
    }
  }

  /**
   * Create a new empty floor.
   * @param floorLevels Level part of a building
   */
  public CreateFloor(...floorLevels: number[]) {
    for (let level of floorLevels) {
      this.school.floors.set(level, new Floor());
    }
    this.isEntityChange = true;
  }

  /** Get a selected floor of a building. */
  public GetFloor(floorLevel: number) {
    this.school.floors.get(floorLevel);
  }

  /** Set floor(s) on the building. */
  public SetFloor(floorLevel: number, floor: Floor) {
    this.school.floors.set(floorLevel, floor);
    this.isEntityChange = true;
  }

  /** Remove floor from a building. */
  public DeleteFloor(floorLevel: number) {
    this.school.floors.delete(floorLevel);
    this.isEntityChange = true;
  }

  /** Clear all floors from a building. */
  public ClearFloor(floorLevel: number) {
    this.school.floors.clear();
    this.isEntityChange = true;
  }

  /**  This function creates a new floor if it does not exist. */
  public CreateFloorIfNotExists(floorNumber: number) {
    // Check if floor exists. If not, add new floor.
    if (!this.school.floors.has(floorNumber)) {
      this.CreateFloor(floorNumber);
    }
  }

  /** Set the texture on the background of the building */
  public SetWall(texture: Texture<Resource>) {
    this.school.wall = new TilingSprite(texture);
    this.school.wall.zIndex = SortingLayer.Background;
    this.school.wall.anchor.set(0, 1);
    this.school.addChild(this.school.wall);
    this.isEntityChange = true;
  }

  /** Set the front door to the building */
  public SetFrontDoor(texture: Texture<Resource>) {
    this.school.frontDoor = new Sprite(texture);
    this.school.frontDoor.anchor.set(0, 1);
    this.school.addChild(this.school.frontDoor);
    this.isEntityChange = true;
  }

  /** Set the signboard at the entrance to the building */
  public SetFrontDoorSign(texture: Texture<Resource>) {
    //TODO add check if already in use
    this.school.doorSign = new Sprite(texture);
    this.school.doorSign.anchor.set(1, 1);
    this.school.doorSign.zIndex = SortingLayer.Midground;
    this.school.addChild(this.school.doorSign);
    this.isEntityChange = true;
  }

  /** Set the roof sign on the building */
  public SetRoofSign(texture: Texture<Resource>) {
    //TODO add check if already in use
    this.school.roofSign = new Sprite(texture);
    this.school.roofSign.anchor.set(0, 1);
    this.school.roofSign.zIndex = SortingLayer.Midground;
    this.school.addChild(this.school.roofSign);
    this.isEntityChange = true;
  }

  /** Add child(s) to the container. */
  public AddEntity(...children: Sprite[] | TilingSprite[]) {
    this.school.addChild(...children);
  }

  /** Get the container of the school. */
  public GetContainer(): Container {
    return this.school;
  }
}
