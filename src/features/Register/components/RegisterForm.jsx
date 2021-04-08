import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../components/Form-controls/InputField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import PasswordField from '../../../components/Form-controls/PasswordField';

const RegisterForm = (props) => {
  const { onSubmit, success, error } = props;

  const schema = yup.object().shape({
    name: yup.string().required('Hãy nhập tên'),
    password: yup.string().required('Hãy nhập mật khẩu').min(6, 'Mật khẩu phải trên 6 ký tự'),
    retypePassword: yup
      .string()
      .required('Hãy nhập lại mật khẩu')
      .oneOf([yup.ref('password')], 'Nhập lại đúng mật khẩu')
      .min(6, 'Mật khẩu phải trên 6 ký tự'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div>
      {isSubmitting && <LinearProgress />}

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="name" label="Name" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        {success && <Typography color="primary">Đăng ký thành công</Typography>}
        {success === false && error && <Typography color="primary">{error}</Typography>}

        <Button disabled={isSubmitting} type="sumbit" variant="contained" fullWidth color="primary">
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
