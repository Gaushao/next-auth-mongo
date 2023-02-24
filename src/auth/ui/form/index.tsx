import { useMemo, PropsWithChildren } from "react";
import FormProvider from "src/form/Provider";
import FormUI from "src/form";

import Hooks from "../hooks";

const { useSession, useRegisterAccount, useUnregisterAccount } = Hooks;

export default class AuthForm {
  static Provider({ children }: PropsWithChildren<{}>) {
    const session = useSession();
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
        {children}
      </FormProvider>
    );
  }

  static NameInput() {
    return (
      <FormUI.InputGroup
        id="name"
        label="Name"
        helper="It will be your display name"
      />
    );
  }

  static Register() {
    return (
      <AuthForm.Provider>
        <h3>Register</h3>
        <AuthForm.NameInput />
      </AuthForm.Provider>
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
}
