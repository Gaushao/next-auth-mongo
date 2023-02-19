import "src/fontsource";
import AuthProvider from "src/auth/ui/Provider";
import ThemeProvider from "src/theme";
import Page from "src/page";

export default function App<P>({
  Component,
  pageProps,
}: {
  Component: React.FC<P & any>;
  pageProps: P;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </AuthProvider>
    </ThemeProvider>
  );
}
