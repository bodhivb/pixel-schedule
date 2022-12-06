import { IRoomType } from "./roomTypeInterface";

export const RoomType: { [key: string]: IRoomType } = {
  classroom: { name: "Instructie", size: 1, url: "rooms/leskamer.png" },
  classroom_window: {
    name: "Instructie",
    size: 1,
    url: "rooms/leskamer_met_ramen.png",
  },
  classroom_Large: {
    name: "Instructie",
    size: 2.5,
    url: "rooms/leskamer_lang.png",
  },
  networking_plaza: {
    name: "Netwerkplein",
    size: 2.5,
    url: "rooms/netwerkplein.png",
  },
  conversation_booth: {
    name: "Gespreksruimte",
    size: 0.5,
    url: "rooms/tafelkamer_1.png",
  },
  office: { name: "Docentenruimte", size: 1, url: "rooms/tafelkamer_2.png" },
  elevator: { name: "Liftkamer", size: 0.5, url: "rooms/liftkamer.png" },
};
