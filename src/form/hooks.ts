import { FormikValues, useFormikContext } from "formik";

export default class Hooks {
  static useFormik = useFormikContext;

  static useFormData = <V = FormikValues>() => {
    const { values, errors } = Hooks.useFormik<V>();
    return { values, errors };
  };

  static useFormFieldData = (fieldname: string) => {
    const { values, errors } = Hooks.useFormData();
    return {
      value: values[fieldname],
      error: errors[fieldname],
    };
  };
}
