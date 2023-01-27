import { IRoomType } from "./roomTypeInterface";

export const RoomType: { [key: string]: IRoomType } = {
  classroom: { name: "Instructie", assets: "rooms.classroom" },
  classroom_window: {
    name: "Instructie",
    assets: "rooms.classroom_with_windows",
  },
  classroom_Large: { name: "Instructie", assets: "rooms.classroom_large" },
  networking_plaza: {
    name: "Netwerkplein",
    assets: "rooms.classroom_network",
  },
  conversation_booth: { name: "Gespreksruimte", assets: "rooms.workplace" },
  office: { name: "Docentenruimte", assets: "rooms.office" },
  elevator: { name: "Liftkamer", assets: "rooms.liftkamer" },
};
