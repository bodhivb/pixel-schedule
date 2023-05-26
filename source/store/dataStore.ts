import EventEmitter from "events";

export class DataStore<T> {
  private key: string;
  private value: T;

  private emitter = new EventEmitter();

  /**
   * Constructor for data store
   * @param key the name where the data is stored
   */
  constructor(key: string) {
    this.key = key;

    const dataStorage = localStorage.getItem(key);
    if (dataStorage) {
      this.value = JSON.parse(dataStorage);
    } else {
      this.value = {} as T;
    }
  }

  /** Get data store */
  public GetData(): T {
    return this.value;
  }

  /** Set data store */
  public SetData(value: T): void {
    if (value !== this.value) {
      this.value = value;
      localStorage.setItem(this.key, JSON.stringify(value));
      this.emitter.emit(this.key, value);
    }
  }

  /** Subscribe to data */
  public on(fn: (...args: any[]) => void): void {
    this.emitter.on(this.key, fn);
  }

  /** Unsubscribe to data */
  public off(fn: (...args: any[]) => void): void {
    this.emitter.off(this.key, fn);
  }
}
