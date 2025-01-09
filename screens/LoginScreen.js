// LoginScreen.js
import React from 'react';

import {useEventContext} from '../store/EventContext';
import AuthContent from '../components/AuthContent';

function LoginScreen() {
  const {login} = useEventContext();

  return <AuthContent authStatus={login} auth="login" />;
}

export default LoginScreen;
