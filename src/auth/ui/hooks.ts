import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useCallback, useMemo, useEffect } from "react";

import useFetch from "src/hooks/useFetch";
import EventHooks from "src/hooks/event";

import Session from "../class/session";

const { useVisibilityChangeOn } = EventHooks;

export default class Hooks {
  static useRegisterAccount() {
    const {
      data,
      error: e,
      execute,
    } = useFetch<{ name?: string; error?: string }, { name: string }>(
      "/api/auth/account/register",
      {},
      {
        method: "POST",
      }
    );
    const error = useMemo(() => data?.error || e, [data, e]);
    useVisibilityChangeOn(data && !error);
    return useMemo(() => ({ execute, error }), [execute, error]);
  }
  static useDeleteAccount() {
    const [token, setToken] = useState("");
    const { data, error, execute } = useFetch<
      { token?: string; done?: boolean; error?: string },
      { name: string }
    >(`/api/auth/account/delete?token=${token}`);
    useEffect(() => {
      if (data?.token) setToken(data?.token);
      if (data?.done) signOut();
    }, [data]);
    return useMemo(
      () => ({ data, execute: () => execute(), error }),
      [data, execute, error]
    );
  }

  static useSession() {
    return new Session(useSession());
  }

  static useSessionUser() {
    return Hooks.useSession().user;
  }

  static useSessionStatus() {
    return Hooks.useSession().status;
  }

  static useIsSessionStatus() {
    const status = Hooks.useSessionStatus();
    return useMemo(
      () =>
        Object.keys(Session.Status).reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: curr === status,
          }),
          {} as Record<keyof typeof Session.Status, boolean>
        ),
      [status]
    );
  }

  static useSignIn() {
    return useCallback(signIn, []);
  }

  static useSignOut() {
    return useCallback(signOut, []);
  }
}
