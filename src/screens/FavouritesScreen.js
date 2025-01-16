import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import BackgroundCoffee from '../components/coffeeDetails/BackgroundCoffee';
import {useCoffeeContext} from '../store/CoffeeContext';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import {COLORS} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('screen');
const favourite_height = height * 0.6;

function FavouritesScreen({navigation}) {
  const {favouritesCoffee} = useCoffeeContext();
  return (
    <View style={styles.favouritesScreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {favouritesCoffee.length === 0 ? (
          <EmptyListAnimation title="Favourites is empty" />
        ) : (
          <>
            <HeaderBar title="cart" />
            <View style={styles.favouritesContainer}>
              {favouritesCoffee.map(coffeeItem => (
                <View key={coffeeItem.id} style={styles.favouriteItem}>
                  <BackgroundCoffee coffee={coffeeItem} />
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Description</Text>
                    <Text style={styles.descriptionText} numberOfLines={3}>
                      {coffeeItem.description}
                    </Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  favouritesScreen: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  favouritesContainer: {
    marginTop: 25,
    marginBottom: 50,
  },
  favouriteItem: {
    borderRadius: 20,
    height: favourite_height,
    marginVertical: 10,
  },
  descriptionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  descriptionTitle: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 5,
  },
  descriptionText: {
    color: COLORS.primaryWhiteHex,
  },
});

export default FavouritesScreen;
