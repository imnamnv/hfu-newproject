import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './components/LoginForm';
import { login } from './userSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const handleTodoFormSubmit = async (value) => {
    try {
      console.log('Form submit: ', value);
      const payload = {
        identifier: `${value.name}@gmail.com`,
        password: value.password,
      };
      const action = login(payload);
      const resultAction = await dispatch(action);

      //extract the payload of a fulfilled action or to throw either the error or,
      //if available, payload created by rejectWithValue from a rejected action

      // it is action.payload in state.current = action.payload in reducer of userSlice file ;
      const user = unwrapResult(resultAction);
      setError('');
      console.log(user);
    } catch (e) {
      console.log('error: ', e);
      setError(e.message);
    }
  };
  return (
    <div>
      <LoginForm error={error} onSubmit={handleTodoFormSubmit} />
    </div>
  );
};

Login.propTypes = {};

export default Login;
