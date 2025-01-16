import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../theme/theme';

function PrimaryCoffeeButton({onPress, children}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
  },
  buttonText: {
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});

export default PrimaryCoffeeButton;
