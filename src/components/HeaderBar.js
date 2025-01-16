import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../theme/theme';
import ProfilePhoto from './ProfilePhoto';
import GradientIcon from './ui/GradientIcon';

function HeaderBar({title}) {
  return (
    <View style={styles.headerBar}>
      <GradientIcon
        name="view-grid"
        size={20}
        color={COLORS.primaryLightGreyHex}
      />
      {title && <Text style={styles.headerText}>{title}</Text>}
      <ProfilePhoto />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
  },
});

export default HeaderBar;
