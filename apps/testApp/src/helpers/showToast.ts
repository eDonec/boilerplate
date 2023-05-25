import Toast from "react-native-root-toast";

import { getFontFamily } from "mobile-core-ui/helpers/getFontFamily";

import { COLORS, FONT_WEIGHT } from "constants/styleVariables";
import { AppFonts, fonts } from "constants/fonts";

const fontFamily = getFontFamily(AppFonts.Poppins, fonts, {
  fontWeight: FONT_WEIGHT.bold,
});

export function showToast(
  message: string,
  type: keyof Omit<typeof COLORS, "TEXT"> = "DANGER"
) {
  Toast.show(message, {
    position: 80,
    backgroundColor: COLORS[type],
    textStyle: {
      fontFamily,
      color: type === "WHITE" ? COLORS.TEXT.BLACK.MAIN : COLORS.TEXT.WHITE.MAIN,
    },
  });
}
