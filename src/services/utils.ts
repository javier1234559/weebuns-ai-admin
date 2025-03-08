import axios from "axios";
import { globalConfig } from "@/config";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
  [key: string]: any;
}

interface RefreshResponse {
  access_token: string;
}

class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<string> | null = null;
  private readonly tokenKey = "accessToken";

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public async getToken(): Promise<string | null> {
    // If there's already a refresh in progress, wait for it
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const token = this.getAccessToken();

    // If no token exists, return null
    if (!token) {
      return null;
    }

    // Check token expiration
    if (this.isTokenExpired(token)) {
      // Token is expired, attempt to refresh
      return this.refreshToken();
    }

    // Token is valid
    return token;
  }

  public getAccessToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  public saveToken(token: string): void {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(this.tokenKey, token);
  }

  public clearToken(): void {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(this.tokenKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = jwtDecode<TokenPayload>(token);
      // Check if token is expired - add 10 second buffer
      console.log(JSON.stringify(payload, null, 2));
      return payload.exp * 1000 < Date.now() + 10000;
    } catch (error) {
      // If we can't decode the token, assume it's expired
      console.error("Error decoding token:", error);
      return true;
    }
  }

  private refreshToken(): Promise<string> {
    // If there's already a refresh in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    // Create new refresh promise
    this.refreshPromise = new Promise<string>((resolve, reject) => {
      axios
        .post<RefreshResponse>(
          `${globalConfig.API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }, // Important to include cookies
        )
        .then((response) => {
          const newToken = response.data.access_token;
          this.saveToken(newToken);
          resolve(newToken);
        })
        .catch((error) => {
          // On error, clear token and reject
          console.error("Failed to refresh token:", error);
          this.clearToken();
          reject(error);
        })
        .finally(() => {
          // Reset the refresh promise
          this.refreshPromise = null;
        });
    });

    return this.refreshPromise;
  }
}

export const handleToken = async (): Promise<string | null> => {
  return TokenManager.getInstance().getToken();
};

export const getCurrentToken = (): string | null => {
  return TokenManager.getInstance().getAccessToken();
};

export const tokenManager = TokenManager.getInstance();

export default tokenManager;
