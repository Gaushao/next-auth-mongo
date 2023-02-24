import Hooks from "src/auth/ui/hooks";
import Link from "next/link";
import { CSSProperties } from "react";

const { useSessionUser, useIsSessionStatus, useSignIn, useSignOut } = Hooks;

function Login() {
  const signIn = useSignIn();
  return <button onClick={() => signIn()}>login</button>;
}

function Logout() {
  const { name } = useSessionUser();
  const signOut = useSignOut();
  return (
    <>
      <Link href={`/account`}>
        <button>{name || "Register"}</button>
      </Link>
      <button onClick={() => signOut()}>logout</button>
    </>
  );
}

function Auth() {
  const { authenticated } = useIsSessionStatus();
  return <div>{authenticated ? <Logout /> : <Login />}</div>;
}

const pageheader: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 8px",
  borderRadius: 4,
  border: "1px solid lightgray",
};

export default function PageHeader() {
  return (
    <div style={pageheader}>
      <Link href="/">
        <h3>/next-auth-mongo</h3>
      </Link>
      <Auth />
    </div>
  );
}
