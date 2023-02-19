import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import email from "./email";

const { GOOGLE_ID = "", GOOGLE_SECRET = "" } = process.env;

const google = {
  clientId: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
};

export default [EmailProvider(email), GoogleProvider(google)];
