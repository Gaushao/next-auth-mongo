import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export default class Token {
  accessToken = "";
  accessTokenExpires = 0;
  refreshToken = "";
  user: User = {
    id: "",
    name: "",
    email: "",
    image: "",
  };

  /**
   * Takes a token, and returns a new token with updated
   * `accessToken` and `accessTokenExpires`. If an error occurs,
   * returns the old token and an error property
   */
  static get refreshAccess() {
    return async function refreshAccessToken(token: Token) {
      try {
        const url =
          "https://oauth2.googleapis.com/token?" +
          new URLSearchParams({
            client_id: String(process.env.GOOGLE_CLIENT_ID),
            client_secret: String(process.env.GOOGLE_CLIENT_SECRET),
            grant_type: "refresh_token",
            refresh_token: String(token.refreshToken),
          });
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
        });
        const refreshedTokens = await response.json();
        if (!response.ok) {
          throw refreshedTokens;
        }
        return {
          ...token,
          accessToken: refreshedTokens.access_token,
          accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
          refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
      } catch (error) {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    };
  }

  constructor(token: Partial<JWT>) {
    return { ...this, ...token };
  }
}
