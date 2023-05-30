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
        { name: "elevator", srcs: "assets/rooms/elevator.png" },
        { name: "elevator_0", srcs: "assets/rooms/elevator_0.png" },
        { name: "elevator_1", srcs: "assets/rooms/elevator_1.png" },
        { name: "elevator_2", srcs: "assets/rooms/elevator_2.png" },
        { name: "elevator_3", srcs: "assets/rooms/elevator_3.png" },
        { name: "office", srcs: "assets/rooms/office.png" },
        { name: "workplace", srcs: "assets/rooms/workplace.png" },
      ],
    },
    {
      name: "teachers",
      assets: [
        { name: "ah", srcs: "assets/teachers/ah.png" },
        { name: "bb", srcs: "assets/teachers/bb.png" },
        { name: "bk", srcs: "assets/teachers/bk.png" },
        { name: "bt", srcs: "assets/teachers/bt.png" },
        { name: "cs", srcs: "assets/teachers/cs.png" },
        { name: "dr", srcs: "assets/teachers/dr.png" },
        { name: "ew", srcs: "assets/teachers/ew.png" },
        { name: "js", srcs: "assets/teachers/js.png" },
        { name: "jw", srcs: "assets/teachers/jw.png" },
        { name: "kd", srcs: "assets/teachers/kd.png" },
        { name: "lf", srcs: "assets/teachers/lf.png" },
        { name: "mh-1", srcs: "assets/teachers/mh-1.png" },
        { name: "no", srcs: "assets/teachers/no.png" },
        { name: "pg", srcs: "assets/teachers/pg.png" },
        { name: "pl-1", srcs: "assets/teachers/pl-1.png" },
        { name: "pl-2", srcs: "assets/teachers/pl-2.png" },
        { name: "ss", srcs: "assets/teachers/ss.png" },
        { name: "tb-1", srcs: "assets/teachers/tb-1.png" },
        { name: "tb-2", srcs: "assets/teachers/tb-2.png" },
        { name: "wh", srcs: "assets/teachers/wh.png" },
      ],
    },
  ],
};
