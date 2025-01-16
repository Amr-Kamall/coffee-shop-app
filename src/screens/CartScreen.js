import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useCoffeeContext} from '../store/CoffeeContext';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

import CoffeeItem from '../components/cart/CoffeeItem';
import CoffeeTotalPrice from '../components/cart/CoffeeTotalPrice';

function CartScreen({navigation}) {
  const {cart} = useCoffeeContext();

  return (
    <View style={styles.cartScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {cart.length === 0 ? (
          <EmptyListAnimation title="cart is empty" />
        ) : (
          <>
            <HeaderBar title="cart" />
            <View style={styles.cartContainer}>
              {cart.map(coffeeItem => (
                <CoffeeItem
                  key={coffeeItem.id}
                  coffeeItem={coffeeItem}
                  navigation={navigation}
                />
              ))}
              <CoffeeTotalPrice onPress={() => navigation.navigate('payment')}>
                Pay
              </CoffeeTotalPrice>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cartScreen: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  cartItem: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 20,
  },
  // ****************
  cartContainer: {
    marginBottom: 50,
  },
});

export default CartScreen;
