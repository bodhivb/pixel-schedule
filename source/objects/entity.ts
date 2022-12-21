import { Sprite, Texture } from "pixi.js";

export class Entity extends Sprite {
  // Common
  //public name: string;
  //public imgUrl: string;

  /*
  constructor(config: any) {
    super(Texture.from("assets/examples/bunny.png"));

    //this.name = config.name || "GameOject";
    //this.imgUrl = config.imgUrl || "assets/examples/bunny.png";

    this.x = 200;
    this.y = 200;
    this.anchor.set(0.5);
  }*/

  // Start is called before the first frame update
  public Start?(): void;
  // Update is called once per frame
  public Update?(dt: number): void;

  // OnDestroy is called when the object was disabled during the frame
  public OnDestroy?(): void;
}
