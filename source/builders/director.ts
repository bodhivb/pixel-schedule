import { Cache } from "pixi.js";
import { IFloor } from "../interfaces/floorInterface";
import { FloorBuilder } from "./floorBuilder";
import { SchoolBuilder } from "./schoolBuilder";

export class Director {
  private schoolBuilder: SchoolBuilder;

  constructor(schoolBuilder: SchoolBuilder) {
    this.schoolBuilder = schoolBuilder;
  }

  /**
   * Let the builder build a school.
   * @param config Detail of how the floor should make.
   */
  public buildSintLucas(config: IFloor[]) {
    // Default texture
    this.schoolBuilder.SetWall(Cache.get("wall"));
    this.schoolBuilder.SetFrontDoor(Cache.get("front_door"));
    // SintLucas texture
    this.schoolBuilder.SetFrontDoorSign(Cache.get("sintlucas_doorsign"));
    this.schoolBuilder.SetRoofSign(Cache.get("sintlucas_roofsign"));

    for (let i = 0; i < config.length; i++) {
      // Build a floor for a school
      const floorBuilder = new FloorBuilder(i, undefined, config[i].floor);
      floorBuilder.SetContainer(this.schoolBuilder.GetContainer());
      floorBuilder.SetElevator(Cache.get("elevator_" + config[i].floor));
      floorBuilder.SetDoor(Cache.get("door"));
      floorBuilder.AddRoom(...config[i].rooms);
      floorBuilder.SetHallway();

      // Apply a floor to school
      this.schoolBuilder.SetFloor(config[i].floor, floorBuilder.GetFloor());
    }
  }
}
