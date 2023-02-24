import { useMemo } from "react";

import FormHooks from "./hooks";

const { useFormik, useFormFieldData } = FormHooks;

class TextInputProps {
  id = "inputid";
  label = "Input Label";
  helper?: string;
}

export default class FormUI {
  static useSubmit = () => FormHooks.useFormik().submitForm;

  static SubmitButton() {
    return <button onClick={FormUI.useSubmit()}>submit</button>;
  }

  static TextInputProps = TextInputProps;

  static TextInput({ id, label, helper, ...props }: TextInputProps) {
    const { handleChange } = useFormik();
    const { value, error } = useFormFieldData(id);
    const warn = useMemo(() => (error ? String(error) : helper), [error]);
    return (
      <div>
        <p>{label}</p>
        <input id={id} value={value} onChange={handleChange} {...props} />
        {warn && <p>{warn}</p>}
      </div>
    );
  }

  static InputGroup(props = new FormUI.TextInputProps()) {
    return (
      <div>
        <FormUI.TextInput {...props} />
        <FormUI.SubmitButton />
      </div>
    );
  }
}
