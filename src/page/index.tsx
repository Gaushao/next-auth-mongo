import Header from "./Header";
import Nav from "./Nav";

export default function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <Nav />
      <div>{children}</div>
    </>
  );
}
