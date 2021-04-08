import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputField = (props) => {
  const { form, name, label, disabled } = props;
  const { formState } = form;
  const errorTitle = formState.errors[name]?.message;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <TextField
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          name={name}
          fullWidth
          label={label}
          disabled={disabled}
          error={!!errorTitle}
          helperText={errorTitle}
          variant="outlined"
          margin="normal"
        />
      )}
    ></Controller>
  );
};

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
