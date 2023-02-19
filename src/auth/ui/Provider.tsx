import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function NextAuthProvider({
  children,
  ...props
}: React.PropsWithChildren<SessionProviderProps>) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
