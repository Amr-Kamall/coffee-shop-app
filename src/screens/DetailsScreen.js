import React from 'react';
import {View, StyleSheet} from 'react-native';
import BackgroundCoffee from '../components/coffeeDetails/BackgroundCoffee';
import CoffeeInfo from '../components/coffeeDetails/CoffeeInfo';

function DetailsScreen({route}) {
  const selectedCoffee = route.params.coffee;
  return (
    <View style={styles.container}>
      {/* first part */}
      <BackgroundCoffee coffee={selectedCoffee} isNavigated="isNavigated" />
      {/* second part */}
      <CoffeeInfo coffee={selectedCoffee} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailsScreen;
