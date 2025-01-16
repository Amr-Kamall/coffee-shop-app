import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../theme/theme';

function CoffeePrice({children}) {
  return (
    <View style={styles.priceContainer}>
      <Text style={styles.coffeeCurrency}>$</Text>
      <View>
        <Text style={styles.priceText}>Price</Text>
        <Text style={styles.coffeePrice}>{children}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coffeePrice: {
    color: COLORS.primaryWhiteHex,
    fontSize: 18,
  },
  priceText: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 12,
  },
  coffeeCurrency: {
    fontSize: 18,
    color: COLORS.primaryOrangeHex,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 5,
  },
});

export default CoffeePrice;
