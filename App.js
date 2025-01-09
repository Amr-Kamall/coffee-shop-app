/* eslint-disable react/no-unstable-nested-components */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import {EventProvider, useEventContext} from './store/EventContext';
import EventsScreen from './screens/EventsScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Registrations from './screens/Registrations';
import IconTab from './components/IconTab';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Stack.Screen
        name="events"
        component={EventsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="eventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}

function TapNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={AuthenticatedStack}
        name="eventsScreens"
        options={{
          headerShown: false,
          title: 'Events',
          tabBarIcon: () => <IconTab icon="calendar-month" size={24} />,
        }}
      />
      <Tab.Screen
        component={Registrations}
        name="registraions"
        options={{
          tabBarIcon: () => <IconTab icon="file-find" size={24} />,
          title: 'Registrations',
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const {isAuthenticated} = useEventContext();
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <TapNavigator />}
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
