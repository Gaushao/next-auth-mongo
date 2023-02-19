import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export default class AuthFetching {
  static get getSessionProps() {
    return async (context: GetServerSidePropsContext) => {
      const session = await getSession(context);
      return {
        props: { session },
      };
    };
  }
  static get getSessionPropsOrRedirect() {
    return async (context: GetServerSidePropsContext, destination = "/") => {
      const {
        props: { session },
      } = await AuthFetching.getSessionProps(context);
      if (!session) {
        return {
          redirect: {
            destination,
            permanent: false,
          },
        };
      }

      return {
        props: { session },
      };
    };
  }
}
