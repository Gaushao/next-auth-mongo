import { Theme } from "next-auth";

export default class EmailTheme implements Theme {
  color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: "#346df1",
    buttonBorder: "#346df1",
    buttonText: "#fff",
  };

  colorScheme?: "auto" | "dark" | "light";
  logo?: string;
  brandColor?: string;
  buttonText?: string;
  constructor(
    initial: Partial<Theme> & { color?: Partial<EmailTheme["color"]> }
  ) {
    if (initial.brandColor) this.brandColor = initial.brandColor;
    if (initial.buttonText) this.buttonText = initial.buttonText;
    if (initial.colorScheme) this.colorScheme = initial.colorScheme;
    if (initial.logo) this.logo = initial.logo;
    return {
      color: {
        ...this.color,
        ...initial.color,
      },
    };
  }
}
