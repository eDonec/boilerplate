import { createContext, useCallback, useContext, useState } from "react";

type ITheme = "dark" | "light";
export const DarkModeContext = createContext<{
  theme: ITheme;
  changeTheme: (newTheme: ITheme) => void;
}>({
  theme: "light",
  changeTheme: () => null,
});

export const useDarkModeContext = () => {
  const [mode, setMode] = useState<ITheme>("light");

  return {
    value: {
      theme: mode,
      changeTheme: setMode,
    },
  };
};

export const useDarkMode = () => {
  const { theme, changeTheme } = useContext(DarkModeContext);

  const toggleDarkMode = useCallback(() => {
    changeTheme(theme === "dark" ? "light" : "dark");
  }, [changeTheme, theme]);

  return { theme, toggleDarkMode };
};
