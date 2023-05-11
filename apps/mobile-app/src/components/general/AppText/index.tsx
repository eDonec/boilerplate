import React from 'react';
import { Text, TextProps } from 'react-native';

import { useAppText } from './useAppText';

const AppText: React.FC<TextProps> = ({ children, style, ...props }) => {
  const { styles } = useAppText(style);

  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
