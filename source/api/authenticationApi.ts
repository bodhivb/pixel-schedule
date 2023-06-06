import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Api } from "./api";

interface ForwardResponse {
  errorText: string;
  forwardCount: number;
  lastResponse: AxiosResponse;
}

class AuthenticationApi extends Api {
  httpService: AxiosInstance;

  constructor() {
    super();
    this.httpService = axios.create({ withCredentials: true });
  }

  public async authentication(loginData: {
    username: string;
    password: string;
  }) {
    // Setup first request
    const firstRequest: AxiosRequestConfig = {
      method: "get",
      url: "https://myx-silu.xedule.nl/Authentication/sso/SSOLogin.aspx?ngsw-bypass=true",
    };

    // Forward the request
    const { errorText, forwardCount, lastResponse } =
      await this.createForwardRequest(
        this.httpService,
        firstRequest,
        5,
        loginData
      );

    // Error handling
    if (errorText) {
      console.error(errorText);
    }
    // Error handling
    if (!lastResponse.config.url?.includes("sso.xedule.nl")) {
      console.error("Result is different");
    }
  }

  /**
   * createForwardRequest will be forwarded automatically if there is submit form in response
   * @param axiosInstance
   * @param firstRequest
   * @param maxForwards
   * @param loginData
   * @returns The last response
   */
  async createForwardRequest(
    axiosInstance: AxiosInstance,
    firstRequest: AxiosRequestConfig,
    maxForwards: number = 5,
    loginData: { username: string; password: string }
  ): Promise<ForwardResponse> {
    let errorText = "";
    let forwardCount = 0;
    let lastResponse = await axiosInstance.request(firstRequest);
    const dom = new DOMParser();

    console.log(lastResponse.config.url);

    for (; forwardCount < maxForwards; forwardCount++) {
      const document = dom.parseFromString(lastResponse.data, "text/html");
      const forwardForm = document.querySelector("form");

      console.log("www");
      // Stop forward if response has no form
      if (!forwardForm) {
        break;
      }

      console.log(forwardForm);
      console.log(forwardForm.toString());
      console.log(forwardForm.action);
      console.log(forwardForm.action.toString());

      console.log(window.location.origin);
      console.log(window.location.host);

      // Stop forward if there are errors
      const errorElement = document.getElementById("errorText");
      if (errorElement && errorElement.innerHTML) {
        errorText = errorElement.innerHTML;
        break;
      }

      // Create a new config request
      const config: AxiosRequestConfig<any> = {};
      config.url = forwardForm.action;
      config.method = forwardForm.method ?? "post";
      config.data = {};

      console.log(config.url);

      // Copy the form data into a new request
      const inputs = forwardForm.querySelectorAll("input");
      inputs.forEach((input) => (config.data[input.name] = input.value));

      // Login page
      if (lastResponse.data.includes("FormsAuthentication")) {
        // Fill the username and password in
        config.data["UserName"] = loginData.username;
        config.data["Password"] = loginData.password;

        if (!config.url.startsWith("http")) {
          // Fix the url with domain name
          config.url = "https://adfsproxy.sintlucas.nl:443" + config.url;
        }
      }

      // Stop forward if a new request is same as previous
      if (lastResponse.config.url == config.url) {
        errorText = "The request has been black holed.";
        break;
      }

      // Convert json object to http query string
      config.data = new URLSearchParams(config.data);

      console.log("Foward request: " + forwardCount);
      console.log(config.url);

      lastResponse = await axiosInstance.request(config);
    }

    return { errorText, forwardCount, lastResponse };
  }
}

export const authenticationApi = new AuthenticationApi();
