import { ColorMatrix, Sprite, Texture } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";

export class BackgroundColor extends Sprite implements IEntityEvent {
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
  static createGradientTexture(quality: number = 500, nightValue: number = 0) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = quality;

    const ctx = canvas.getContext("2d")!;

    const colorNight: Color = { r: 8, g: 8, b: 25 };
    const colorDayTop: Color = { r: 109, g: 206, b: 247 };
    const colorDayBottom: Color = { r: 222, g: 244, b: 254 };

    const colorTop: Color = {
      r: BackgroundColor.Lerp(colorDayTop.r, colorNight.r, nightValue),
      g: BackgroundColor.Lerp(colorDayTop.g, colorNight.g, nightValue),
      b: BackgroundColor.Lerp(colorDayTop.b, colorNight.b, nightValue),
    };

    const colorBottom: Color = {
      r: BackgroundColor.Lerp(colorDayBottom.r, colorNight.r, nightValue),
      g: BackgroundColor.Lerp(colorDayBottom.g, colorNight.g, nightValue),
      b: BackgroundColor.Lerp(colorDayBottom.b, colorNight.b, nightValue),
    };
    //const data;

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, 0, quality);
    //Old code
    //grd.addColorStop(0, "#6DCEF7");
    //grd.addColorStop(1, "#DEF4FE");
    grd.addColorStop(
      0,
      "rgb(" + colorTop.r + "," + colorTop.g + "," + colorTop.b + ")"
    );
    grd.addColorStop(
      1,
      "rgb(" + colorBottom.r + "," + colorBottom.g + "," + colorBottom.b + ")"
    );

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1, quality);

    return Texture.from(canvas);
  }

  dayTimer = 0;
  daySwitch = false;

  Update(dt: number) {
    if (this.daySwitch) {
      this.dayTimer -= dt / 120;
    } else {
      this.dayTimer += dt / 120;
    }

    if (this.dayTimer >= 2) {
      this.daySwitch = true;
    }

    if (this.dayTimer <= -1) {
      this.daySwitch = false;
    }

    this.texture = BackgroundColor.createGradientTexture(
      500,
      Math.max(Math.min(this.dayTimer, 1), 0)
    );
  }

  /**
   * Linearly interpolates between a and b by t
   * @param a
   * @param b
   * @param t
   */
  public static Lerp(a: number, b: number, t: number) {
    return (1 - t) * a + b * t;
  }
}

interface Color {
  r: number;
  g: number;
  b: number;
}
