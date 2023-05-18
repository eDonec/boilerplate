import { useContext, createContext } from "react";

type FontContextType = {
  fontFamily: string;
};

const FontContext = createContext<FontContextType>({
  fontFamily: "Roboto",
});

export const FontProvider = FontContext.Provider;

export function useFontContext() {
  const context = useContext(FontContext);

  if (!context) {
    throw new Error("useFontContext must be used within a FontProvider");
  }

  return context;
}
