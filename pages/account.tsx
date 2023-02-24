import AuthFetching from "src/auth/ui/fetching";
import AuthUserUI from "src/auth/ui/form";
import { GetServerSidePropsContext } from "next";

export default function AccountPage() {
  return (
    <>
      <AuthUserUI.Register />
      <AuthUserUI.Unregister />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return AuthFetching.getSessionPropsOrRedirect(context);
}
