import type { TextStyle } from "react-native/types";

export enum AppFonts {
  Poppins = "Poppins",
}

export const fonts: Record<
  AppFonts,
  {
    fontWeights: Record<NonNullable<TextStyle["fontWeight"]>, string>;
    fontStyles: {
      normal: string;
      italic: string;
    };
  }
> = {
  Poppins: {
    fontWeights: {
      100: "Thin",
      200: "ExtraLight",
      300: "Light",
      400: "Regular",
      500: "Medium",
      600: "SemiBold",
      700: "Bold",
      800: "ExtraBold",
      900: "Black",
      normal: "Regular",
      bold: "Bold",
    },
    fontStyles: {
      normal: "",
      italic: "Italic",
    },
  },
};
