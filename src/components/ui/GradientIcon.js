import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
import CustomIcon from './CustomIcon';
import {COLORS, SPACING} from '../../theme/theme';

function GradientIcon({size, color, name}) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.linearGradient}>
      <CustomIcon size={size} color={color} name={name} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
  },
});

export default GradientIcon;
