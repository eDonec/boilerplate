import React from "react";
import { Text, TextProps } from "react-native";

import { useAppText } from "./useAppText";

function AppText({ children, style, ...props }: TextProps) {
  const { styles } = useAppText(style);

  return (
    <Text style={styles.text} {...props}>
      {children}
    </Text>
  );
}

export default AppText;
