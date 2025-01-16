import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SPACING} from '../theme/theme';

function ProfilePhoto() {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require('../assets/app_images/avatar.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SPACING.space_12,
  },
});

export default ProfilePhoto;
