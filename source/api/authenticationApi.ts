import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ForwardResponse {
  errorText: string;
  forwardCount: number;
  lastResponse: AxiosResponse;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthenticationResponse {
  isSuccess: boolean;
  errorMessage?: string;
  token?: string;
}

export class AuthenticationApi {
  private httpService: AxiosInstance;
  private readonly authenticationUrl: string =
    "https://myx-silu.xedule.nl/Authentication/sso/SSOLogin.aspx?ngsw-bypass=true";

  constructor() {
    this.httpService = axios.create({ withCredentials: true });
  }

  public async checkAuthStatus() {
    return this.httpService.get(this.authenticationUrl);
  }

  /**
   * Authenticated via SURFConext authentication and return token
   * @param body login data
   * @returns response result status with token
   */
  public async authentication(
    body: LoginData
  ): Promise<AuthenticationResponse> {
    // Setup first request
    const firstRequest: AxiosRequestConfig = {
      method: "get",
      url: this.authenticationUrl,
    };

    // Forward the request
    const { errorText, lastResponse } = await this.createForwardRequest(
      this.httpService,
      firstRequest,
      5,
      body
    );

    // Error handling
    if (errorText) {
      return { isSuccess: false, errorMessage: errorText };
    }
    // Error handling
    if (!lastResponse.config.url?.includes("sso.xedule.nl")) {
      return { isSuccess: false, errorMessage: "Result is different" };
    }

    // Get the token
    let token: string = (
      lastResponse.request.path ?? lastResponse.request.responseURL
    ).toString();

    if (token) {
      if (token.includes("token=")) {
        token = token.substring(token.indexOf("token=") + "token=".length);
      }

      if (token.includes("&ngsw-bypass=")) {
        token = token.substring(0, token.indexOf("&ngsw-bypass="));
      }

      // Return token
      return { isSuccess: true, token };
    }

    return {
      isSuccess: false,
      errorMessage: "This application is out of date",
    };
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

    for (; forwardCount < maxForwards; forwardCount++) {
      const document = dom.parseFromString(lastResponse.data, "text/html");
      const forwardForm = document.querySelector("form");

      // Stop forward if response has no form
      if (!forwardForm) {
        break;
      }

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

      // Copy the form data into a new request
      const inputs = forwardForm.querySelectorAll("input");
      inputs.forEach((input) => (config.data[input.name] = input.value));

      // Login page
      if (lastResponse.data.includes("FormsAuthentication")) {
        // Fill the username and password in
        config.data["UserName"] = loginData.username;
        config.data["Password"] = loginData.password;

        if (config.url.startsWith(window.location.origin)) {
          // Remove the origin from the url
          config.url = config.url.substring(window.location.origin.length);
        }

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
      lastResponse = await axiosInstance.request(config);
    }

    return { errorText, forwardCount, lastResponse };
  }
}
