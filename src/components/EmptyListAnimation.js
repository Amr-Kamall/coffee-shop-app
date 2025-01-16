import LottieView from 'lottie-react-native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../theme/theme';

function EmptyListAnimation({title}) {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        style={styles.lottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.animationText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieStyle: {
    height: 200,
    width: 200,
  },
  animationText: {
    color: COLORS.primaryOrangeHex,
    fontSize: 20,
  },
});

export default EmptyListAnimation;
