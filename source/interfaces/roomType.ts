import { IRoomType } from "./roomTypeInterface";

export const RoomType: { [key: string]: IRoomType } = {
  classroom: { name: "Instructie", asset: "classroom" },
  classroom_window: { name: "Instructie", asset: "classroom_with_windows" },
  classroom_Large: { name: "Instructie", asset: "classroom_large" },
  networking_plaza: { name: "Netwerkplein", asset: "classroom_network" },
  conversation_booth: { name: "Gespreksruimte", asset: "workplace" },
  office: { name: "Docentenruimte", asset: "office" },
  elevator: { name: "Liftkamer", asset: "liftkamer" },
};
