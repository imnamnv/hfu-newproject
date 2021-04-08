import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from './components/RegisterForm';
import userApi from '../../api/userApi';

const Register = (props) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (value) => {
    try {
      const payload = {
        email: `${value.name}@gmail.com`,
        username: `${value.name}@gmail.com`, // same as email
        password: '123123', // min length 6
        fullName: 'Easy Frontend',
      };
      const register = await userApi.register(payload);
      setSuccess(true);
      console.log('data: ', register);
    } catch (e) {
      console.log('Error: ', e);

      setSuccess(false);
      if (e.message) {
        setError(e.message);
      }
    }
  };
  return (
    <div>
      Register
      <RegisterForm success={success} error={error} onSubmit={onSubmit}></RegisterForm>
    </div>
  );
};

Register.propTypes = {};

export default Register;
