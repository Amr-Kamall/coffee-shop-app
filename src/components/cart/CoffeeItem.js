import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../../theme/theme';
import CustomIcon from '../ui/CustomIcon';
import {useCoffeeContext} from '../../store/CoffeeContext';

function CoffeeItem({coffeeItem, navigation}) {
  const {setCart, removeCoffeeItem} = useCoffeeContext();

  function handleIncreaseQuantity(cartItem, size) {
    setCart(coffees =>
      coffees.map(coffeeObj =>
        coffeeObj.id === cartItem.id
          ? {
              ...coffeeObj,
              selectedSizes: coffeeObj.selectedSizes.map(sizeItem =>
                sizeItem.size === size.size
                  ? {
                      ...sizeItem,
                      quantity: sizeItem.quantity + 1, // Prevent negative quantity
                    }
                  : sizeItem,
              ),
            }
          : coffeeObj,
      ),
    );
  }

  function handleDecreaseQuantity(cartItem, size) {
    if (size.quantity === 1) {
      // Remove the size item if the current quantity is 1
      const updatedSizes = cartItem.selectedSizes.filter(
        sizeItem => sizeItem.size !== size.size,
      );

      if (updatedSizes.length === 0) {
        // Remove the entire cart item if no sizes are left
        removeCoffeeItem(cartItem.id);
      } else {
        // Update the cart item with remaining sizes
        setCart(coffees =>
          coffees.map(coffeeObj =>
            coffeeObj.id === cartItem.id
              ? {...coffeeObj, selectedSizes: updatedSizes}
              : coffeeObj,
          ),
        );
      }
    } else {
      // Decrease quantity if it's greater than 1
      setCart(coffees =>
        coffees.map(coffeeObj =>
          coffeeObj.id === cartItem.id
            ? {
                ...coffeeObj,
                selectedSizes: coffeeObj.selectedSizes.map(sizeItem =>
                  sizeItem.size === size.size
                    ? {...sizeItem, quantity: sizeItem.quantity - 1}
                    : sizeItem,
                ),
              }
            : coffeeObj,
        ),
      );
    }
  }
  return (
    <Pressable
      style={({pressed}) => [
        styles.coffeeItemWrapper,
        pressed && styles.pressed,
      ]}
      onPress={() => navigation.navigate('details', {coffee: coffeeItem})}>
      {coffeeItem.selectedSizes.length !== 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.coffeeItemLinearGradient}>
          <View style={styles.coffeeItemRow}>
            <Image
              source={coffeeItem.imagelink_square}
              style={styles.coffeeItemImage}
            />
            <View style={styles.coffeeItemInfo}>
              <View>
                <Text style={styles.coffeeItemTitle}>{coffeeItem.name}</Text>
                <Text style={styles.coffeeItemSubtitle}>
                  {coffeeItem.special_ingredient}
                </Text>
              </View>
              <View style={styles.coffeeItemRoastedContainer}>
                <Text style={styles.coffeeItemRoastedText}>
                  {coffeeItem.roasted}
                </Text>
              </View>
            </View>
          </View>
          {coffeeItem.selectedSizes.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.coffeeItemSizeRowContainer}>
              <View style={styles.coffeeItemSizeValueContainer}>
                <View style={styles.SizeBox}>
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize:
                          coffeeItem.type === 'Bean'
                            ? FONTSIZE.size_12
                            : FONTSIZE.size_16,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {data.currency}
                  <Text style={styles.SizePrice}>
                    {' '}
                    {data.price * coffeeItem.selectedSizes[index].quantity}
                  </Text>
                </Text>
              </View>
              <View style={styles.coffeeItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.coffeeItemIcon}
                  onPress={() => handleDecreaseQuantity(coffeeItem, data)}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.coffeeItemQuantityContainer}>
                  <Text style={styles.coffeeItemQuantityText}>
                    {data.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.coffeeItemIcon}
                  onPress={() => {
                    handleIncreaseQuantity(coffeeItem, data);
                  }}>
                  <CustomIcon
                    name="plus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.coffeeItemSingleLinearGradient}>
          <View>
            <Image
              source={coffeeItem.imagelink_square}
              style={styles.coffeeItemSingleImage}
            />
          </View>
          <View style={styles.coffeeItemSingleInfoContainer}>
            <View>
              <Text style={styles.coffeeItemTitle}>{coffeeItem.name}</Text>
              <Text style={styles.coffeeItemSubtitle}>
                {coffeeItem.special_ingredient}
              </Text>
            </View>
            <View style={styles.coffeeItemSingleSizeValueContainer}>
              <View style={styles.SizeBox}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        coffeeItem.type === 'Bean'
                          ? FONTSIZE.size_12
                          : FONTSIZE.size_16,
                    },
                  ]}>
                  {coffeeItem.selectedSizes[0].size}
                </Text>
              </View>
              <Text style={styles.SizeCurrency}>
                {coffeeItem.selectedSizes[0].currency}
                <Text style={styles.SizePrice}>
                  {' '}
                  {coffeeItem.selectedSizes[0].price *
                    coffeeItem.selectedSizes[0].quantity}
                </Text>
              </Text>
            </View>
            <View style={styles.coffeeItemSingleQuantityContainer}>
              <TouchableOpacity
                style={styles.coffeeItemIcon}
                onPress={() =>
                  handleDecreaseQuantity(
                    coffeeItem,
                    coffeeItem.selectedSizes[0],
                  )
                }>
                <CustomIcon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={styles.coffeeItemQuantityContainer}>
                <Text style={styles.coffeeItemQuantityText}>
                  {coffeeItem.selectedSizes[0].quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.coffeeItemIcon}
                onPress={() =>
                  handleIncreaseQuantity(
                    coffeeItem,
                    coffeeItem.selectedSizes[0],
                  )
                }>
                <CustomIcon
                  name="plus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  coffeeItemWrapper: {
    marginVertical: 20,
  },
  coffeeItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  coffeeItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  coffeeItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  coffeeItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  coffeeItemTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  coffeeItemSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  coffeeItemRoastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  coffeeItemRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  coffeeItemSizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.space_20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  coffeeItemSizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    flex: 1,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  SizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  coffeeItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  coffeeItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    flex: 0.8,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  coffeeItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  coffeeItemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  coffeeItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
  coffeeItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  coffeeItemSingleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  coffeeItemSingleQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default CoffeeItem;
