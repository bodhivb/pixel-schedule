import { IFloor } from "./interfaces/floorInterface";
import { RoomType } from "./interfaces/roomType";

/**
 * SintLucas front rooms.
 * This should be replaced with schedule API.
 */
export const SintLucasSchoolData: IFloor[] = [
  {
    floor: 0,
    rooms: [
      { number: "N.0.60", type: RoomType.networking_plaza },
      { number: "N.0.51", type: RoomType.classroom },
      { number: "N.0.53", type: RoomType.classroom_window },
      { number: "N.0.55", type: RoomType.classroom_window },
      { number: "N.0.73", type: RoomType.classroom },
      { number: "N.0.74", type: RoomType.classroom_window },
    ],
  },
  {
    floor: 2,
    rooms: [
      { number: "N.2.32", type: RoomType.classroom_Large },
      { number: "N.2.21", type: RoomType.classroom_window },
      { number: "N.2.41", type: RoomType.classroom_window },
    ],
  },
  {
    floor: 3,
    rooms: [
      { number: "N.3.31", type: RoomType.classroom_Large },
      { number: "N.3.22", type: RoomType.classroom_window },
      { number: "N.3.32", type: RoomType.classroom_window },
    ],
  },
];
