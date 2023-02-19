import { useMemo, PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormProvider from "src/form/Provider";
import FormUI from "src/form";

import Hooks from "../hooks";

const { useSession, useRegisterAccount, useDeleteAccount } = Hooks;

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
        <Typography mt={3} variant="h5">
          Register
        </Typography>
        <AuthForm.NameInput />
      </AuthForm.Provider>
    );
  }

  static DeleteAccount() {
    const { execute, data, error } = useDeleteAccount();
    if (data?.done) return null;
    return (
      <>
        <Typography mt={3} variant="h5">
          Delete Account
        </Typography>
        {data ? (
          <>
            {data?.error ? (
              <Typography mt={3} variant="body2" color="red">
                {data.error}
              </Typography>
            ) : (
              <>
                <Typography m={3} variant="body2" color="red">
                  this action is not reversible, sure to proceed?
                </Typography>
                <Button variant="contained" onClick={execute}>
                  yes
                </Button>
              </>
            )}
          </>
        ) : (
          <Button onClick={execute}>delete</Button>
        )}
      </>
    );
  }
}
