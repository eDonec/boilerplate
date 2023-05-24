import { createContext, PropsWithChildren, useContext } from "react";
import { TextStyle } from "react-native/types";

import { useTheme } from "@react-navigation/native";

export type AppFonts<T extends string = string> = Record<
  T,
  {
    fontWeights: Record<NonNullable<TextStyle["fontWeight"]>, string>;
    fontStyles: {
      normal: string;
      italic: string;
    };
  }
>;

type FontContextType<T extends string = string> = {
  appFonts: AppFonts<T>;
  defaultFontFamily: T;
};

const FontContext = createContext<FontContextType | null>(null);

export function FontProvider<T extends string>({
  children,
  ...props
}: PropsWithChildren<FontContextType<T>>) {
  return <FontContext.Provider value={props}>{children}</FontContext.Provider>;
}

export function useFontContext() {
  const context = useContext(FontContext);

  if (!context) {
    throw new Error("useFontContext must be used within a FontProvider");
  }

  return context;
}
