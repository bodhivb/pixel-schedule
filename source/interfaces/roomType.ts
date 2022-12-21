import { IRoomType } from "./roomTypeInterface";

export const RoomType: { [key: string]: IRoomType } = {
  classroom: { name: "Instructie", url: "rooms/classroom.png" },
  classroom_window: {
    name: "Instructie",
    url: "rooms/classroom_with_windows.png",
  },
  classroom_Large: { name: "Instructie", url: "rooms/classroom_large.png" },
  networking_plaza: {
    name: "Netwerkplein",
    url: "rooms/classroom_network.png",
  },
  conversation_booth: { name: "Gespreksruimte", url: "rooms/workplace.png" },
  office: { name: "Docentenruimte", url: "rooms/office.png" },
  elevator: { name: "Liftkamer", url: "rooms/liftkamer.png" },
};
