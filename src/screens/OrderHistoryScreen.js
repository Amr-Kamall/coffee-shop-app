import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/theme';
import {useCoffeeContext} from '../store/CoffeeContext';
import LinearGradient from 'react-native-linear-gradient';
import EmptyListAnimation from '../components/EmptyListAnimation';

function OrderHistoryScreen() {
  const {orderHistory} = useCoffeeContext();

  return (
    <View style={styles.container}>
      {orderHistory.length === 0 ? (
        <EmptyListAnimation title="No Order History" />
      ) : (
        <>
          <HeaderBar title="Order History" />
          {/* order item */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            {orderHistory.map((orderItem, index) => (
              <View key={index} style={styles.orderItem}>
                {/* orderHeader */}
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderDateTitle}>Order Date</Text>
                    <Text style={styles.orderDate}>{orderItem.date}</Text>
                  </View>
                  <View style={styles.totalAmount}>
                    <Text style={styles.orderTotalAmountTitle}>
                      Total amount
                    </Text>
                    <Text style={styles.orderTotalAount}>
                      ${' '}
                      {orderItem.order
                        .map(coffee => coffee.selectedSizes)
                        .map(coffee => coffee[0])
                        .reduce(
                          (acc, cur) =>
                            acc + parseFloat(cur.price) * cur.quantity,
                          0,
                        )}
                    </Text>
                  </View>
                </View>
                {/* order list */}
                <View>
                  {orderItem.order.map((coffee, ind) => (
                    <LinearGradient
                      key={ind}
                      style={styles.coffeeItem}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                      {/* coffee header */}
                      <View style={styles.coffeeHeader}>
                        <Image
                          style={styles.coffeeImage}
                          source={coffee.imagelink_square}
                        />
                        <View>
                          <Text style={styles.coffeeName}>{coffee.name}</Text>
                          <Text style={styles.special_ingredient}>
                            {coffee.special_ingredient}
                          </Text>
                        </View>
                        <Text style={styles.coffeePrice}>
                          <Text style={styles.coffeeCurrency}>$</Text>{' '}
                          {coffee.selectedSizes.reduce(
                            // to get total price of coffee item
                            (acc, cur) => acc + cur.price * cur.quantity,
                            0,
                          )}
                        </Text>
                      </View>
                      {/* coffee body */}
                      <View>
                        {coffee.selectedSizes.map((selectedSize, i) => (
                          <View key={i} style={styles.selectedSizeItem}>
                            {/* sizes */}
                            <View style={styles.cofeeSizesRow}>
                              <View style={styles.sizeContainer}>
                                <Text style={styles.coffeeSize}>
                                  {selectedSize.size}
                                </Text>
                              </View>
                              <View>
                                <View style={styles.coffeeSizePriceContainer}>
                                  <Text style={styles.coffeeCurrency}>$</Text>
                                  <Text style={styles.coffeeSizePrice}>
                                    {selectedSize.price}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Text style={styles.coffeeQuantity}>
                              <Text style={styles.coffeeCurrency}>x</Text>{' '}
                              {selectedSize.quantity}
                            </Text>
                            <Text style={styles.finalSelectedSizePrice}>
                              {selectedSize.price * selectedSize.quantity}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </LinearGradient>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollView: {
    flexGrow: 1,
    marginVertical: 30,
  },
  orderItem: {
    marginVertical: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDateTitle: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 18,
  },
  orderDate: {
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
    fontWeight: '300',
  },
  orderTotalAmountTitle: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 18,
  },
  orderTotalAount: {
    fontSize: 18,
    color: COLORS.primaryOrangeHex,
    fontWeight: '300',
  },
  totalAmount: {
    alignItems: 'flex-end',
  },
  coffeeItem: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
  },
  coffeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  coffeeImage: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  coffeeName: {
    fontSize: 20,
    color: COLORS.primaryWhiteHex,
  },
  special_ingredient: {
    fontSize: 10,
    color: COLORS.primaryWhiteHex,
  },
  coffeeCurrency: {
    fontWeight: 'bold',
    color: COLORS.primaryOrangeHex,
    fontSize: 19,
  },
  coffeePrice: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 19,
  },
  selectedSizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cofeeSizesRow: {
    flexDirection: 'row',
    gap: 3,
  },
  sizeContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  coffeeSize: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 14,
  },
  coffeeSizePriceContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    width: 90,
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    gap: 5,
  },
  coffeeSizePrice: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 17,
  },
  coffeeQuantity: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 17,
  },
  finalSelectedSizePrice: {
    color: COLORS.primaryOrangeHex,
    fontWeight: '500',
    fontSize: 17,
  },
});

export default OrderHistoryScreen;
