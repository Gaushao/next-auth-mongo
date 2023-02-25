import { CallbacksOptions } from "next-auth";
import Token from "./token";
import AuthDB from "./database";

export default {
  async jwt({ token: t, user, account }) {
    const token = new Token(t);
    // Initial sign in
    if (account && user)
      return {
        accessToken: account.access_token,
        accessTokenExpires: Date.now() + (account.expires_at || 1) * 1000,
        refreshToken: account.refresh_token,
        user,
      };

    // Return previous token if the access token has not expired yet
    if (Date.now() < token?.accessTokenExpires) return token;

    // Access token has expired, try to update it
    return Token.refreshAccess(token);
  },
  async session({ session, token, ...rest }) {
    const u = token.user as Token["user"];
    const user = await AuthDB.getUserById(u.id);
    if (user) session.user = user;
    const { accessToken, error } = token;
    return {
      ...session,
      accessToken,
      error,
    };
  },
} as Partial<CallbacksOptions>;
