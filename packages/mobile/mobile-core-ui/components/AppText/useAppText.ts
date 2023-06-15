import { StyleProp, StyleSheet, TextStyle } from "react-native";

import { useTheme } from "@react-navigation/native";

import { getFontFamily } from "../../helpers/getFontFamily";
import { useThemedStyleSheet } from "../../hooks/useThemedStyleSheet";

export function useAppText(style: StyleProp<TextStyle> = {}) {
  const styles = useThemedStyleSheet(
    (theme, appFonts, defaultFontFamily) => {
      const { fontFamily, fontWeight, ...styleRest } =
        StyleSheet.flatten(style);

      return {
        text: [
          styleRest,
          {
            fontWeight: undefined,
            color: theme.colors.text,
            fontFamily: getFontFamily(
              fontFamily ?? defaultFontFamily,
              appFonts,
              { fontWeight }
            ),
          },
        ],
      };
    },
    [style]
  );

  return { styles };
}
