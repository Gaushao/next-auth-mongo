import { SendVerificationRequestParams } from "next-auth/providers";
import EmailTheme from "./theme";

export default class EmailTemplate {
  /**
   * Email HTML body
   * Insert invisible space into domains from being turned into a hyperlink by email
   * clients like Outlook and Apple mail, as this is confusing because it seems
   * like they are supposed to click on it to sign in.
   *
   * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
   */
  static html(url: string, theme: EmailTheme) {
    const { color } = theme;

    return `
        <body style="background: ${color.background};">
          <table width="100%" border="0" cellspacing="20" cellpadding="0"
            style="background: ${
              color.mainBackground
            }; max-width: 600px; margin: auto; border-radius: 10px;">
            <tr>
              <td align="center"
                style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
                  color.text
                };">
                Sign in to <strong>${EmailTemplate.domain(url)}</strong>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
                        <a href="${url}" target="_blank">
                        <p>Sign in</p>
                        </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center"
                style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${
                  color.text
                };">
                If you did not request this email you can safely ignore it.
              </td>
            </tr>
          </table>
        </body>
        `;
  }

  /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
  static text(url: string) {
    return `Sign in to ${EmailTemplate.host(url)}\n${url}\n\n`;
  }
  static host = (url: string) => new URL(url).host;
  static domain = (url: string) =>
    EmailTemplate.host(url).replace(/\./g, "&#8203;.");
}
