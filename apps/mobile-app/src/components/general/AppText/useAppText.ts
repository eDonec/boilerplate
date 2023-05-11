import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import getFontFamily, { AppFonts } from 'helpers/getFontFamily';
import { useThemedStyleSheet } from 'hooks/useAppStyles';

export const useAppText = (style: StyleProp<TextStyle> = {}) => {
  const styles = useThemedStyleSheet(
    theme => {
      const { fontFamily, fontWeight, ...styleRest } =
        StyleSheet.flatten(style);
      return {
        text: [
          styleRest,
          {
            fontWeight: undefined,
            color: theme.colors.text,
            fontFamily: getFontFamily(fontFamily as AppFonts, { fontWeight }),
          },
        ],
      };
    },
    [style],
  );

  return { styles };
};
