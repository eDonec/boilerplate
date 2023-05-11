import Toast from 'react-native-root-toast';

import { COLORS, FONT_WEIGHT } from 'constants/styleVariables';

import getFontFamily, { AppFonts } from './getFontFamily';

const fontFamily = getFontFamily(AppFonts.Poppins, {
  fontWeight: FONT_WEIGHT.bold,
});

export const showToast = (
  message: string,
  type: keyof Omit<typeof COLORS, 'TEXT'> = 'DANGER',
) => {
  Toast.show(message, {
    position: 80,
    backgroundColor: COLORS[type],
    textStyle: {
      fontFamily,
      color: type === 'WHITE' ? COLORS.TEXT.BLACK.MAIN : COLORS.TEXT.WHITE.MAIN,
    },
  });
};
