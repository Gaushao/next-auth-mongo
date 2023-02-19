import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input, { InputProps } from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useMemo } from "react";

import FormHooks from "./hooks";

const { useFormik, useFormFieldData } = FormHooks;

class TextInputProps implements InputProps {
  id = "inputid";
  label = "Input Label";
  helper?: string;
}

export default class FormUI {
  static useSubmit = () => FormHooks.useFormik().submitForm;

  static SubmitButton() {
    return <Button onClick={FormUI.useSubmit()}>submit</Button>;
  }

  static TextInputProps = TextInputProps;

  static TextInput({ id, label, helper, ...props }: TextInputProps) {
    const { handleChange } = useFormik();
    const { value, error } = useFormFieldData(id);
    const warn = useMemo(() => (error ? String(error) : helper), [error]);
    const aria = `${id}-helper`;
    return (
      <FormControl margin="normal">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          id={id}
          aria-describedby={aria}
          value={value}
          error={!!error}
          onChange={handleChange}
          {...props}
        />
        {warn && <FormHelperText id={aria}>{warn}</FormHelperText>}
      </FormControl>
    );
  }

  static InputGroup(props = new FormUI.TextInputProps()) {
    return (
      <Box display="flex" width="max-content">
        <Box m="auto">
          <FormUI.TextInput {...props} />
        </Box>
        <FormUI.SubmitButton />
      </Box>
    );
  }
}
