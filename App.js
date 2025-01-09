import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import {EventProvider, useEventContext} from './store/EventContext';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

// we will make protected routes approach
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const {isAuthenticated} = useEventContext();
  console.log('Is Authenticated:', isAuthenticated);

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
function App() {
  return (
    <EventProvider>
      <Navigation />
    </EventProvider>
  );
}

export default App;
