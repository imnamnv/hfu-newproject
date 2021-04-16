import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';

const QuantityField = (props) => {
  const { form, name, label, disabled } = props;
  const { formState, setValue } = form;
  const errorTitle = formState.errors[name]?.message;

  return (
    <FormControl error={!!errorTitle} variant="outlined" fullWidth margin="normal">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box style={{ display: 'flex', flexFlow: 'row nowrap', textAlign: 'center' }}>
            <IconButton
              onClick={() => {
                setValue(name, +value ? +value - 1 : 1);
              }}
            >
              <RemoveCircleOutline />
            </IconButton>
            <OutlinedInput
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              name={name}
              type="number"
              fullWidth
              disabled={disabled}
              error={!!errorTitle}
              variant="outlined"
            />
            <IconButton
              onClick={() => {
                setValue(name, +value ? +value + 1 : 1);
              }}
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText error={!!errorTitle}>{errorTitle}</FormHelperText>
    </FormControl>
  );
};

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  lable: PropTypes.string,
  disabled: PropTypes.bool,
};

export default QuantityField;
