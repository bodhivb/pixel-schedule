import { Texture } from "pixi.js";
import { Teacher } from "../objects/teacher";
import { View } from "./view";

export class SchoolView extends View {
  constructor() {
    super("School");

    let bodhi = new Teacher(Texture.from("assets/teachers/bodhi.png"));

    this.entities.push(bodhi);
    this.addChild(bodhi);
  }
}
