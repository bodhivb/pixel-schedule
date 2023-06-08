import { Sprite, Texture } from "pixi.js";
import { IEntityEvent } from "../interfaces/entityEvent";

export class BackgroundColor extends Sprite implements IEntityEvent {
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
  static createGradientTexture(quality: number = 500, daylightValue: number = 0) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = quality;
    const ctx = canvas.getContext("2d")!;

    const colorNight: Color = { r: 8, g: 8, b: 25 };
    const colorDayTop: Color = { r: 109, g: 206, b: 247 };
    const colorDayBottom: Color = { r: 222, g: 244, b: 254 };

    const colorTop: Color = {
      r: BackgroundColor.Lerp(colorNight.r, colorDayTop.r, daylightValue),
      g: BackgroundColor.Lerp(colorNight.g, colorDayTop.g, daylightValue),
      b: BackgroundColor.Lerp(colorNight.b, colorDayTop.b, daylightValue),
    };

    const colorBottom: Color = {
      r: BackgroundColor.Lerp(colorNight.r, colorDayBottom.r, daylightValue),
      g: BackgroundColor.Lerp(colorNight.g, colorDayBottom.g, daylightValue),
      b: BackgroundColor.Lerp(colorNight.b, colorDayBottom.b, daylightValue),
    };
    

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

  UpdateMinute(dt: number) {
    this.texture = BackgroundColor.createGradientTexture(
      500,
      BackgroundColor.getDaylightValue()
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

  /**
   * Function to calculate daylight based on current time
   * @return value between 0 and 1 where 1 (12:00) is full daylight
   */
  public static getDaylightValue() {
    const currentDay = new Date;
    const totalMinutes = currentDay.getHours() * 60 + currentDay.getMinutes()
    // max minutes per day = 1540
    // 720 = 12:00
    return (-Math.cos(Math.PI/770 * totalMinutes) + 1) / 2;
  }
}

interface Color {
  r: number;
  g: number;
  b: number;
}
