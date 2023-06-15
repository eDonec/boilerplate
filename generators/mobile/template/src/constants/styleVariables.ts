import { TextStyle } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters/extend';

import { vmin } from 'helpers/dimensions';

type FontWeights =
  | 'extraLight'
  | 'light'
  | 'regular'
  | 'semiBold'
  | 'bold'
  | 'black';

export const COLORS = {
  PRIMARY: '#f6ae2d',
  SECONDARY: '#63052f',
  SUCCESS: '#356b04',
  INFO: '#01172f',
  WARNING: '#ffba00',
  DANGER: '#fa383e',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY: '#555555',
  TEXT: {
    BLACK: {
      MAIN: 'rgba(0,0,0,0.87)',
      SECONDARY: 'rgba(0,0,0,0.60)',
      DISABLED: 'rgba(0,0,0,0.38)',
    },
    WHITE: {
      MAIN: 'rgba(255,255,255,0.87)',
      SECONDARY: 'rgba(255,255,255,0.60)',
      DISABLED: 'rgba(255,255,255,0.38)',
    },
  },
};

export const FONT_WEIGHT: Record<FontWeights, TextStyle['fontWeight']> = {
  extraLight: '200',
  light: '300',
  regular: 'normal',
  semiBold: '600',
  bold: 'bold',
  black: '900',
} as const;

export const FONT_SIZE = {
  h1: scale(96),
  h2: scale(60),
  h3: scale(48),
  h4: scale(34),
  h5: scale(24),
  h6: scale(20),
  subtitle_1: scale(16),
  subtitle_2: scale(14),
  body_1: scale(16),
  body_2: scale(14),
  button: scale(14),
  caption: scale(12),
  overline: scale(10),
};

export const SHADOWS = {
  elevation: 5,
  shadowColor: COLORS.BLACK,
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

export const BORDER_RADIUS = {
  sm: scale(2),
  md: scale(5),
  lg: scale(10),
};

export const INPUT_HEIGHT = verticalScale(40);
export const DEFAULT_SPACE = scale(10);
export const VERTICAL_DEFAULT_SPACE = verticalScale(10);
export const BUTTON_BORDER_WIDTH = DEFAULT_SPACE * 0.2;
export const GAMEBAR_CIRCLE_SIZE = 12 * vmin;
