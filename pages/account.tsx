import { AccountUI } from "src/auth/ui";
import AuthProps from "src/auth/api/props";

export default function AccountPage({ session }: { session: any }) {
  return (
    <>
      <AccountUI.Register session={session} />
      <AccountUI.Unregister />
    </>
  );
}

export const getServerSideProps = AuthProps.session;
