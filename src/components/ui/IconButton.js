/* eslint-disable react/react-in-jsx-scope */
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../theme/theme';

function IconButton({icon, size, color, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    padding: 4,
  },
  pressed: {
    opacity: 0.75,
  },
});
