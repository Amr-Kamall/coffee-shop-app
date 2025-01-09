// RegisterScreen.js
import React from 'react';
import {useEventContext} from '../store/EventContext';
import AuthContent from '../components/AuthContent';

function RegisterScreen() {
  const {register} = useEventContext();

  return <AuthContent authStatus={register} auth="register" />;
}

export default RegisterScreen;
