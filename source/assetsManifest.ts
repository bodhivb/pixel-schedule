import { ResolverManifest } from "pixi.js";

export const assetsManifest: ResolverManifest = {
  bundles: [
    {
      name: "buildings",
      assets: [
        { name: "door", srcs: "assets/buildings/door.png" },
        { name: "front_door", srcs: "assets/buildings/front_door.png" },
        {
          name: "sintlucas_doorsign",
          srcs: "assets/buildings/sintlucas_doorsign.png",
        },
        {
          name: "sintlucas_roofsign",
          srcs: "assets/buildings/sintlucas_roofsign.png",
        },
        { name: "wall_outside", srcs: "assets/buildings/wall_outside.png" },
        { name: "wall", srcs: "assets/buildings/wall.png" },
      ],
    },
    {
      name: "outdoors",
      assets: [
        { name: "cloud_small", srcs: "assets/outdoors/cloud_small.png" },
        { name: "cloud_medium", srcs: "assets/outdoors/cloud_medium.png" },
        { name: "cloud_large", srcs: "assets/outdoors/cloud_large.png" },
        { name: "grass", srcs: "assets/outdoors/grass.png" },
        { name: "sun", srcs: "assets/outdoors/sun.png" },
        { name: "tree", srcs: "assets/outdoors/tree.png" },
      ],
    },
    {
      name: "rooms",
      assets: [
        { name: "classroom_large", srcs: "assets/rooms/classroom_large.png" },
        {
          name: "classroom_network",
          srcs: "assets/rooms/classroom_network.png",
        },
        {
          name: "classroom_with_windows",
          srcs: "assets/rooms/classroom_with_windows.png",
        },
        { name: "classroom", srcs: "assets/rooms/classroom.png" },
        { name: "office", srcs: "assets/rooms/office.png" },
        { name: "workplace", srcs: "assets/rooms/workplace.png" },
      ],
    },
    {
      name: "teachers",
      assets: [{ name: "bodhi", srcs: "assets/teachers/bodhi.png" }],
    },
  ],
};
