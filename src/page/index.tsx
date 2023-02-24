import Header from "./Header";

export default function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
