import { Container } from "@mui/material";
import Header from "./Header";

export default function Page({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
