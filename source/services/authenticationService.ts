import { AuthenticationApi } from "../api/authenticationApi";

class AuthenticationService {
  public api: AuthenticationApi;

  constructor() {
    this.api = new AuthenticationApi();
  }

  public async isLoggedIn(): Promise<boolean> {
    // Has a token
    const currentToken = localStorage.getItem("token");
    if (!currentToken) return false;

    const result = await this.api.checkAuthStatus();

    // Must be successful
    if (result.status != 200) return false;

    // Login page has a length of 24324
    // Granted page has a length of 7140
    if (result.data.length > 10000) return false;

    return true;
  }

  public async login(username: string, password: string): Promise<boolean> {
    const result = await this.api.authentication({
      username,
      password,
    });

    if (!result.isSuccess) {
      console.warn("Authentication failed (21)", result.errorMessage);
      return false;
    }

    // Save the token
    localStorage.setItem("token", result.token ?? "");

    // TODO restart the service
    return true;
  }
}

export const authenticationService = new AuthenticationService();
