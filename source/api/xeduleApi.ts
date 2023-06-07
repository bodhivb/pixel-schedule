import axios from "axios";

export class XeduleApi<T = any> {
  private baseUrl: string = "https://myx-silu.xedule.nl/api/";
  private basePath: string;

  public data: T[] = [];

  /**
   * Abstract class
   * @param basePath The path to the api endpoint
   */
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  /**
   * Get the data from the xedule api
   * @param path URL parameters to add to the base path
   * @returns
   */
  public async get(path: string = ""): Promise<T[]> {
    const res = await axios.get(this.baseUrl + this.basePath + path, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });

    if (res.status == 200 && res.data.result) {
      this.data = res.data.result;
    } else {
      //TODO error handling
    }

    return this.data;
  }
}
