import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PropsWithChildren, useMemo } from "react";

const dark: ThemeOptions = {
  palette: {
    mode: "dark",
  },
};

export default function Provider({
  children,
  ...theme
}: PropsWithChildren<ThemeOptions>) {
  return (
    <ThemeProvider
      theme={useMemo(() => createTheme({ ...dark, ...(theme || {}) }), [theme])}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
