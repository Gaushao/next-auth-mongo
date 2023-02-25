import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import AuthDB from "./database";

export default class AuthProps {
  static get redirect() {
    return (destination = "/") => ({
      props: {},
      redirect: {
        destination,
        permanent: false,
      },
    });
  }
  static get session() {
    return async (context: GetServerSidePropsContext) => {
      const session = await getSession(context);
      return session !== null
        ? {
            props: { session },
          }
        : AuthProps.redirect();
    };
  }
  static get users() {
    return async (context: GetServerSidePropsContext, destination = "/") => {
      const session = await getSession(context);
      const users = (await AuthDB.listUsers()).map(
        ({ email = null, name = null, image = null }) => ({
          email,
          name,
          image,
        })
      );
      return {
        props: { users },
      };
    };
  }
}
