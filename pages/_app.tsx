import "src/fontsource";
import AuthProvider from "src/auth/ui/Provider";
import Page from "src/page";

export default function App<P>({
  Component,
  pageProps,
}: {
  Component: React.FC<P & any>;
  pageProps: P;
}) {
  return (
    <AuthProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </AuthProvider>
  );
}
