import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import GradientIcon from '../components/ui/GradientIcon';
import {COLORS} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import CoffeeTotalPrice from '../components/cart/CoffeeTotalPrice';
import PopUpAnimation from '../components/PopUpAnimation';
import {useCoffeeContext} from '../store/CoffeeContext';

function PaymentScreen({navigation}) {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const PaymentList = [
    {
      name: 'Credit Card',
      icon: require('../assets/app_images/credit.png'),
      visaIcon: require('../assets/app_images/visa.png'),
    },
    {
      name: 'Wallet',
      icon: require('../assets/app_images/wallet.png'),
    },
    {
      name: 'Google Pay',
      icon: require('../assets/app_images/gpay.png'),
    },
    {
      name: 'Apple Pay',
      icon: require('../assets/app_images/applepay.png'),
    },
    {
      name: 'Amazon Pay',
      icon: require('../assets/app_images/amazonpay.png'),
    },
  ];
  const {cart, addToOrdersHistory, setCart} = useCoffeeContext();

  function handlePayment() {
    setShowAnimation(true);
    addToOrdersHistory(cart);
    setCart([]);
    setTimeout(
      function () {
        setShowAnimation(false);
        navigation.navigate('tapNavigator', {
          screen: 'orderHistoryScreen',
          params: {orderInformation: cart},
        });
      },
      [1500],
    );
  }
  return (
    <View style={styles.paymentScreenContainer}>
      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottiStyle}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}
      {/* payment header starts */}
      <View style={styles.paymentHeader}>
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          onPress={() => navigation.goBack()}>
          <GradientIcon
            size={20}
            name="arrow-left"
            color={COLORS.primaryLightGreyHex}
          />
        </Pressable>
        <Text style={styles.paymentHeaderTitle}>Payment</Text>
        <View />
      </View>
      {/* payment header ends */}
      {/* payment container starts */}
      <View style={styles.paymentContainer}>
        {PaymentList.map((payment, index) =>
          index === 0 ? (
            <TouchableOpacity
              onPress={() => setSelectedPayment(index)}
              key={payment.name}
              style={[
                styles.creditCardPayment,
                selectedPayment === index
                  ? {borderColor: COLORS.primaryOrangeHex}
                  : null,
              ]}>
              <Text style={styles.creditCardTitle}>{payment.name}</Text>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradientCreditCard}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                {/* credit card header */}
                <View style={styles.creditCartHeader}>
                  <Image source={payment.icon} />
                  <Image source={payment.visaIcon} />
                </View>
                {/* credit card body */}
                <View style={styles.creditCardBody}>
                  <Text style={styles.creditCardBodyNumbers}>3897</Text>
                  <Text style={styles.creditCardBodyNumbers}>8923</Text>
                  <Text style={styles.creditCardBodyNumbers}>6745</Text>
                  <Text style={styles.creditCardBodyNumbers}>4638</Text>
                </View>
                {/* credit card footer */}
                <View style={styles.creditCardFooter}>
                  <View>
                    <Text style={styles.creditCardName}>Card Holder Name</Text>
                    <Text style={styles.creditCardPreson}>Robert Evans</Text>
                  </View>
                  <View style={styles.creditCardFooterExpires}>
                    <Text style={styles.creditCardExpires}>Expiry Date</Text>
                    <Text style={styles.creditCardExpiresDate}>02/30</Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setSelectedPayment(index)}
              key={payment.name}
              style={[
                styles.paymentItem,
                selectedPayment === index
                  ? {borderColor: COLORS.primaryOrangeHex, borderWidth: 2}
                  : null,
              ]}>
              <LinearGradient
                style={styles.paymentItemGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                <View style={styles.paymentInnerItem}>
                  <Image source={payment.icon} style={styles.imagePayment} />
                  <Text style={styles.paymentItemName}>{payment.name}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ),
        )}
      </View>
      {/* payment container ends */}
      <View style={styles.priceContainer}>
        <CoffeeTotalPrice onPress={handlePayment}>
          Pay from {PaymentList[selectedPayment].name}
        </CoffeeTotalPrice>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: 20,
  },
  lottiStyle: {
    flex: 1,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentHeaderTitle: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 18,
  },
  paymentContainer: {
    paddingTop: 20,
  },
  creditCardPayment: {
    borderColor: COLORS.primaryGreyHex,
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  creditCardTitle: {
    color: COLORS.primaryWhiteHex,
    marginBottom: 10,
    fontWeight: '500',
  },
  gradientCreditCard: {
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
    height: 180,
  },
  creditCartHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  creditCartHeaderTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: 19,
    fontWeight: 'bold',
  },
  creditCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  creditCardBodyNumbers: {
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
    letterSpacing: 5,
  },
  creditCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditCardName: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 12,
  },
  creditCardFooterExpires: {
    alignItems: 'flex-end',
  },
  creditCardPreson: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '400',
    fontSize: 19,
  },
  creditCardExpires: {color: COLORS.primaryLightGreyHex, fontSize: 13},
  creditCardExpiresDate: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '400',
    fontSize: 19,
  },
  paymentItem: {
    borderRadius: 20,
    marginVertical: 7,
  },
  paymentItemGradient: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 10,
  },
  imagePayment: {
    width: 30,
    height: 30,
  },
  paymentItemName: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 16,
  },
  paymentInnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  priceContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default PaymentScreen;
