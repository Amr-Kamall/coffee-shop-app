import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomIcon = ({name, size, color}) => {
  return <Icon name={name} size={size} color={color} />;
};

export default CustomIcon;
