import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function IconTab({icon, color, size}) {
  return <Icon name={icon} size={size} color={color} />;
}

export default IconTab;
