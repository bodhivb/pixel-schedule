export interface IEntityEvent {
  /** Start is called before the first frame update. */
  Start?(): void;

  /** Update is called once per frame. */
  Update?(dt: number): void;

  /** OnDestroy is called when the object was disabled during the frame. */
  OnDestroy?(): void;
}
