import { IRoomType } from "./roomTypeInterface";

export const RoomType: { [key: string]: IRoomType } = {
  classroom_art: { name: "Instructie", asset: "classroom_art" },
  classroom_dev: { name: "Instructie", asset: "classroom_dev" },
  classroom_Large: { name: "Instructie", asset: "classroom_large" },
  networking_plaza_trees: {
    name: "Netwerkplein",
    asset: "classroom_network_with_trees",
  },
  networking_plaza: { name: "Netwerkplein", asset: "classroom_network" },
  classroom_projector: { name: "Instructie", asset: "classroom_projector" },
  classroom_cabinet: { name: "Instructie", asset: "classroom_with_cabinet" },
  classroom_window: { name: "Instructie", asset: "classroom_with_windows" },
  classroom: { name: "Instructie", asset: "classroom" },
  office: { name: "Docentenruimte", asset: "office" },
  conversation_booth: { name: "Gespreksruimte", asset: "workplace" },
};
