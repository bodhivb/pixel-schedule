import { Sprite, Texture } from "pixi.js";

export class BackgroundColor extends Sprite {
  //TODO Add color changed by day time

  constructor() {
    //TODO Remove c_height/c_width because these are magic code
    const c_height = 800 + 2;
    const c_width = 1920;

    const gradTexture = BackgroundColor.createGradientTexture(c_height);
    super(gradTexture);

    this.position.set(0, 0);
    this.width = c_width;
    this.height = c_height;
  }

  /**
   * Create a linear gradient texture
   * @param quality adjust it if somehow you need better quality for very very big images
   * @returns
   */
  static createGradientTexture(quality: number = 500) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = quality;

    const ctx = canvas.getContext("2d")!;

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 0, quality);
    grd.addColorStop(0, "#6DCEF7");
    grd.addColorStop(1, "#DEF4FE");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1, quality);

    return Texture.from(canvas);
  }
}
