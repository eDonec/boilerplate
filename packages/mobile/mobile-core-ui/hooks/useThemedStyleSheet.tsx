import { useMemo } from "react";
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import { Theme, useTheme } from "@react-navigation/native";

import { AppFonts, useFontContext } from "../contexts";

export function useThemedStyleSheet<
  T extends Record<
    string,
    StyleProp<
      Animated.AnimateStyle<StyleProp<ViewStyle | ImageStyle | TextStyle>>
    >
  >
>(
  styles: (theme: Theme, appFonts: AppFonts, defaultFontFamily: string) => T,
  deps: any[] = []
) {
  const { appFonts, defaultFontFamily } = useFontContext();
  const theme = useTheme();

  return useMemo(
    () => styles(theme, appFonts, defaultFontFamily),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, appFonts, defaultFontFamily, styles, ...deps]
  );
}
