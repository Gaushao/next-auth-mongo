import { EmailConfig } from "next-auth/providers";

import transport from "./transport";

const {
  EMAIL_SERVER_HOST = "",
  EMAIL_SERVER_PORT = "",
  EMAIL_SERVER_USER = "",
  EMAIL_SERVER_PASSWORD = "",
  EMAIL_FROM = "",
  EMAIL_SECRET = "",
} = process.env;

export default {
  secret: EMAIL_SECRET,
  server: {
    host: EMAIL_SERVER_HOST,
    port: Number(EMAIL_SERVER_PORT),
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  },
  from: EMAIL_FROM,
  sendVerificationRequest: transport,
} as Partial<EmailConfig>;
