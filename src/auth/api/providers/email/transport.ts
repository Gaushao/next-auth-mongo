import { SendVerificationRequestParams } from "next-auth/providers";
import { createTransport } from "nodemailer";

import EmailTemplate from "./template";
import EmailTheme from "./theme";

export default async function transport(params: SendVerificationRequestParams) {
  try {
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const { identifier, url, provider, theme } = params;
    const { host } = new URL(url);
    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
      to: identifier,
      from: provider.from,
      subject: `Sign in to ${host}`,
      text: EmailTemplate.text(url),
      html: EmailTemplate.html(url, new EmailTheme(theme)),
    });
    const pending = result.rejected.concat(result.pending);
    if (pending.some(Boolean)) throw new Error(pending.join());
  } catch (error) {
    throw new Error(`Email Transport: ${error}`);
  }
}
