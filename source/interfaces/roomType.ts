import { IRoomType } from "./roomTypeInterface";

export const RoomType: { [key: string]: IRoomType } = {
  classroom: { name: "Instructie", assets: "classroom" },
  classroom_window: { name: "Instructie", assets: "classroom_with_windows" },
  classroom_Large: { name: "Instructie", assets: "classroom_large" },
  networking_plaza: { name: "Netwerkplein", assets: "classroom_network" },
  conversation_booth: { name: "Gespreksruimte", assets: "workplace" },
  office: { name: "Docentenruimte", assets: "office" },
  elevator: { name: "Liftkamer", assets: "liftkamer" },
};
