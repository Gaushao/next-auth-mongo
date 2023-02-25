import { useMemo } from "react";
import FormProvider from "src/form/Provider";
import Session from "../class/session";
import FormUI from "src/form";
import Hooks from "./hooks";

const { useRegisterAccount, useUnregisterAccount } = Hooks;

export default class AccountUI {
  static Register({ session }: { session: Session }) {
    const {
      user: { name },
    } = session;

    const { execute, error } = useRegisterAccount();
    const initial = useMemo(
      () => ({
        name,
      }),
      [name]
    );
    const errors = useMemo(
      () => ({
        name: error,
      }),
      [error]
    );
    return (
      <FormProvider initial={initial} errors={errors} submit={execute}>
        <h3>Register</h3>
        <FormUI.InputGroup
          id="name"
          label="Name"
          helper="It will be your display name"
        />
      </FormProvider>
    );
  }
  static Unregister() {
    const { execute, data, error } = useUnregisterAccount();
    if (data?.done) return null;
    return (
      <>
        <h3>Delete Account</h3>
        {data ? (
          <>
            {data?.error ? (
              <p>{data.error}</p>
            ) : (
              <>
                <p>this action is not reversible, sure to proceed?</p>
                <button onClick={execute}>yes</button>
              </>
            )}
          </>
        ) : (
          <button onClick={execute}>delete</button>
        )}
      </>
    );
  }
  static Page({ session }: { session: Session }) {
    return (
      <>
        <AccountUI.Register session={session} />
        <AccountUI.Unregister />
      </>
    );
  }
}
