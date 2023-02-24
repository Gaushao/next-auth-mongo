import { AuthenticationForm, AuthenticationProps } from "@/src/auth/ui";

export default function AccountPage() {
  return (
    <>
      <AuthenticationForm.Register />
      <AuthenticationForm.Unregister />
    </>
  );
}

export const getServerSideProps = AuthenticationProps.getSessionPropsOrRedirect;
