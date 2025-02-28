import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TapNavigator from './src/components/navigator/TapNavigator';
import {CoffeeProvider} from './src/store/CoffeeContext';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator();
function App() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <CoffeeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={TapNavigator}
            name="tapNavigator"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={DetailsScreen}
            name="details"
            options={{headerShown: false}}
          />
          <Stack.Screen
            component={PaymentScreen}
            name="payment"
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CoffeeProvider>
  );
}

export default App;
