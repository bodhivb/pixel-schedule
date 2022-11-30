import axios, { AxiosInstance } from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export class LoginService {
  readonly jar: CookieJar;
  readonly httpRequest: AxiosInstance;

  constructor() {
    this.jar = new CookieJar();
    this.httpRequest = wrapper(axios.create({ jar: this.jar }));
  }

  public async CheckAuthentication() {
    const res = await axios.get(
      "https://myx-silu.xedule.nl/Authentication/sso/SSOLogin.aspx?ngsw-bypass=true"
    );

    if (res.status == 200 && res.data.includes("FormsAuthentication")) {
      console.log("Login needed");
    } else {
      console.log("Logged in");
    }
  }
}
