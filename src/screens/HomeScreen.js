/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useCoffeeContext} from '../store/CoffeeContext';
import HeaderBar from '../components/HeaderBar';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import CustomIcon from '../components/ui/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const HomeScreen = () => {
  const {coffeeList, beansList} = useCoffeeContext();
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredCoffee, setFilteredCoffee] = useState(coffeeList);
  const listRef = useRef();

  // get categories list
  const categories = [
    'All',
    'Americano',
    'Black Coffee',
    'Cappucchino',
    'Espresso',
    'Latte',
    'Macchiato',
  ];

  //get filtered coffee after press on category
  function getFilteredCoffee(categoryName) {
    // to scroll to beginning of the flatlist when click on new category
    listRef?.current?.scrollToOffset({animated: true, offset: 0});

    setActiveCategory(categoryName);
    const filteredCoffeeFromCategories = coffeeList.filter(coffee =>
      coffee.category.includes(categoryName),
    );
    // to set the coffee data
    setFilteredCoffee(filteredCoffeeFromCategories);
  }

  function handleSearchInput(enteredText) {
    setSearchText(enteredText);
    setActiveCategory('All');

    // to scroll to beginning of the flatlist when click on new category
    listRef?.current?.scrollToOffset({animated: true, offset: 0});

    // implement search func
    const lowercasedText = enteredText.toLowerCase();
    const filteredCoffeeBySearch = coffeeList.filter(coffee =>
      coffee.name.toLowerCase().includes(lowercasedText),
    );
    setFilteredCoffee(filteredCoffeeBySearch);
  }

  function handleClearSearch() {
    setSearchText(''); //here the problem
    setFilteredCoffee(
      activeCategory === 'All'
        ? coffeeList
        : coffeeList.filter(coffee => coffee.category.includes(activeCategory)),
    );
  }

  return (
    <View style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewFlex}>
        {/* header */}
        <HeaderBar />
        {/* screen title */}
        <Text style={styles.screenTitle}>
          Find the best{'\n'}coffee for you
        </Text>
        {/* search input */}
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchIconContainer}>
            <CustomIcon
              name="magnify"
              size={24}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          {searchText.length > 0 && (
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={handleClearSearch}>
              <CustomIcon
                name="close"
                size={24}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
          <TextInput
            value={searchText}
            onChangeText={handleSearchInput}
            placeholder="find your coffee"
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.searchInput}
          />
        </View>
        {/* category scroller */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <View key={index} style={styles.categoryContainer}>
              <TouchableOpacity onPress={() => getFilteredCoffee(category)}>
                <Text
                  style={[
                    styles.categoryText,
                    category === activeCategory ? styles.activeText : null,
                  ]}>
                  {category}
                </Text>
                {activeCategory === category ? (
                  <View style={styles.activeCategoryText} />
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* end category scroller */}
        {/* coffees scroller */}
        {filteredCoffee.length > 0 ? (
          <FlatList
            ref={listRef}
            horizontal
            data={filteredCoffee}
            initialNumToRender={4}
            keyExtractor={item => item.id.toString()}
            nestedScrollEnabled={true}
            renderItem={({item}) => <CoffeeCard item={item} />}
          />
        ) : (
          <View style={styles.coffeeNotFoundContainer}>
            <Text style={styles.coffeeNotFound}>No Coffee Available</Text>
          </View>
        )}
        {/* coffee beans */}
        <Text style={styles.coffeeTitle}>Coffee beans</Text>
        <FlatList
          contentContainerStyle={{marginBottom: 70}}
          horizontal
          data={beansList}
          keyExtractor={item => item.id}
          nestedScrollEnabled={true}
          renderItem={({item}) => <CoffeeCard item={item} />}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginVertical: 20,
  },
  searchContainer: {
    marginTop: 15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIconContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    position: 'absolute',
    right: 15,
    zIndex: 10000,
  },
  searchInput: {
    padding: 10,
    paddingLeft: 20,
    flex: 1,
    color: COLORS.primaryWhiteHex,
  },
  searchIconContainer: {
    width: 20,
  },
  categoryContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    position: 'relative',
  },
  categoryText: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_18,
  },
  activeText: {
    color: COLORS.primaryOrangeHex,
  },
  activeCategoryText: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 'auto',
  },
  coffeeTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  coffeeNotFoundContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coffeeNotFound: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 18,
  },
});

export default HomeScreen;
