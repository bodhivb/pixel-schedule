import { Container, IPointData, Sprite } from "pixi.js";
import { GET_BUILDING_PIXEL } from "../interfaces/constants";
import { IFloor } from "../interfaces/floorInterface";

export class School extends Container {
  //name: string;
  //location: string;

  public doorSign?: Sprite;
  public roofSign?: Sprite;
  //TODO convert this array into dictionary list
  public floors: IFloor[] = [];

  constructor() {
    super();
    this.sortableChildren = true;
  }

  /** Get the number of floors of a school. */
  get GetAmountOfFloor() {
    return this.floors.length;
  }

  /** Get height of the school in pixels. */
  get GetSchoolHeight() {
    return this.GetAmountOfFloor * this.GetFloorHeight;
  }

  /** Get width of the school in pixels. */
  get GetSchoolWidth() {
    return 5 * (this.GetRoomWidth + this.GetWallSize) + this.GetWallSize;
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
