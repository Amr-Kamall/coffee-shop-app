import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../theme/theme';
import {useCoffeeContext} from '../../store/CoffeeContext';
import PrimaryCoffeeButton from '../ui/PrimaryCoffeeButton';
import CoffeePrice from '../CoffeePrice';

function CoffeeInfo({coffee}) {
  const [fullText, setFullText] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const {addToCart} = useCoffeeContext();
  const [selectedSizes, setSelectedSizes] = useState(coffee.prices[0]);
  // const navigation = useNavigation();

  function handleAddToCart() {
    const updatedCoffee = {
      ...coffee,
      selectedSizes,
    };
    addToCart(updatedCoffee); // Pass the coffee with the selected size
    // navigation.navigate('tapNavigator', {screen: 'cart'});
  }

  function handleSelectIndex(index) {
    setSelectedSizeIndex(index);
    const newSelectedSize = coffee.prices[index]; // Get the selected size directly
    setSelectedSizes(newSelectedSize);
  }
  console.log(selectedSizes);

  return (
    <View style={styles.another}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.coffeeDescriptionTitle}>description</Text>
        {fullText ? (
          <TouchableWithoutFeedback onPress={() => setFullText(open => !open)}>
            <Text style={styles.coffeeDescription}>{coffee.description}</Text>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => setFullText(open => !open)}>
            <Text numberOfLines={3} style={styles.coffeeDescription}>
              {coffee.description}
            </Text>
          </TouchableWithoutFeedback>
        )}

        <Text style={styles.coffeeSizeTitle}>size</Text>
        <View style={styles.coffeeSizeContainer}>
          {coffee.prices.map((coffeePrice, index) => (
            <TouchableOpacity
              onPress={() => handleSelectIndex(index)}
              key={coffeePrice.price}
              style={[
                styles.coffeeSizeBox,
                index === selectedSizeIndex ? styles.borderSize : null,
              ]}>
              <Text style={styles.coffeeSize}>{coffeePrice.size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.pricingCoffee}>
          <CoffeePrice> {coffee.prices[selectedSizeIndex].price}</CoffeePrice>
          <PrimaryCoffeeButton onPress={handleAddToCart}>
            Add to cart
          </PrimaryCoffeeButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  another: {
    flex: 0.5,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollView: {
    flex: 1,
  },
  coffeeDescriptionTitle: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 18,
    fontWeight: '500',
  },
  coffeeSizeTitle: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 17,
    fontWeight: '500',
  },
  coffeeDescription: {
    color: COLORS.primaryWhiteHex,
    marginVertical: 10,
  },
  coffeeSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  coffeeSizeBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    flex: 1,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  coffeeSize: {
    color: COLORS.primaryWhiteHex,
  },
  borderSize: {
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
  },
  pricingCoffee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginVertical: 10,
  },
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

export default CoffeeInfo;
