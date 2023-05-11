import { useMemo } from 'react';
import { Theme, useTheme } from '@react-navigation/native';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

export function useThemedStyleSheet<
  T extends Record<
    string,
    StyleProp<
      Animated.AnimateStyle<StyleProp<ViewStyle | ImageStyle | TextStyle>>
    >
  >,
>(styles: (theme: Theme) => T, deps: any[] = []) {
  const theme = useTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => styles(theme), [theme, ...deps]);
}
