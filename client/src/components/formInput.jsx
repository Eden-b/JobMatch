import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';

const FormInput = (props) => {
  const [field, meta] = useField(props);
  //   console.log(field, meta);
  return (
    <TextField
      {...field}
      {...props}
      variant="outlined"
      label={props.placeholder}
      name={props.name}
      placeholder={props.placeholder}
      error={!!meta.error}
      helperText={meta.error && meta.touched && meta.error}
    />
  );
};

export default FormInput;
