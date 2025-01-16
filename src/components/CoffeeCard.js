import React, {memo} from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import CustomIcon from './ui/CustomIcon';
import {useNavigation} from '@react-navigation/native';
import {useCoffeeContext} from '../store/CoffeeContext';
import IconButton from './ui/IconButton';

const width_dimension = Dimensions.get('window').width * 0.4;

function CoffeeCard({item}) {
  const navigation = useNavigation();
  const {addToCart} = useCoffeeContext();
  function handleAddToCart() {
    const selectedSize = item.prices[0]; // Assuming prices[0] is the default size
    console.log('here:', selectedSize); //we stopped

    addToCart({...item, selectedSizes: selectedSize});
  }
  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.push('details', {coffee: item})}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradient}>
        <View style={styles.cardImageContainer}>
          <Image
            source={item.imagelink_square}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.rateContainer}>
            <CustomIcon name="star" size={15} color={COLORS.primaryOrangeHex} />
            <Text style={styles.cardRateText}>{item.average_rating}</Text>
          </View>
        </View>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.specialCardName}>{item.special_ingredient}</Text>
        <View style={styles.pricingContainer}>
          <Text style={styles.cardPrice}>
            <Text style={styles.priceSympol}>$ </Text>
            {item.prices[0].price}
          </Text>
          <View>
            <IconButton
              icon="plus"
              onPress={handleAddToCart}
              size={22}
              color={COLORS.primaryWhiteHex}
            />
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    width: width_dimension,
    marginRight: 10,
    borderRadius: 20,
    zIndex: 100000,
  },
  linearGradient: {
    padding: 10,
    borderRadius: 20,
  },
  cardImageContainer: {
    height: 120,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    width: '50%',
    borderBottomLeftRadius: 20,
    top: 0,
    right: 0,
    overflow: 'hidden',
  },
  cardRateText: {
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  cardName: {
    color: COLORS.primaryWhiteHex,
    fontSize: 15,
    marginVertical: 7,
  },
  specialCardName: {
    fontSize: 12,
    color: COLORS.primaryWhiteHex,
  },
  pricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
    fontSize: 17,
  },
  priceSympol: {
    color: COLORS.primaryOrangeHex,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default memo(CoffeeCard);
