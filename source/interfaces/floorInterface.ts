import { IRoom } from "./roomInterface";

export interface IFloor {
  floor: number;
  rooms: IRoom[];
}
