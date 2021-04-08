import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from '../../../components/Form-controls/InputField';
import { Button, Typography } from '@material-ui/core';
import PasswordField from '../../../components/Form-controls/PasswordField';

const LoginForm = (props) => {
  const schema = yup.object().shape({
    name: yup.string().required('Hãy nhập title'),
    password: yup.string().required('Hãy nhập title'),
  });

  const { onSubmit, error } = props;

  const form = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      Login
      <InputField name="name" label="Name" form={form} />
      <PasswordField name="password" label="password" form={form} />
      {error && <Typography color="primary">{error}</Typography>}
      <Button type="sumbit" variant="contained" fullWidth color="primary">
        Đăng nhập
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;
