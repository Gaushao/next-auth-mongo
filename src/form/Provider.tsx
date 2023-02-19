import { PropsWithChildren } from "react";
import { Formik, Form, FormikValues, FormikConfig, FormikErrors } from "formik";

export default function FormikProvider<V extends FormikValues>({
  children,
  initial,
  errors,
  submit,
}: PropsWithChildren<{
  initial: V;
  errors: FormikErrors<V>;
  submit: FormikConfig<V>["onSubmit"];
}>) {
  return (
    <Formik
      initialValues={initial}
      initialErrors={errors}
      validate={(values) => {
        // handle validation
        const errors = {};
        return errors;
      }}
      onSubmit={submit}
      enableReinitialize
    >
      <Form>{children}</Form>
    </Formik>
  );
}
