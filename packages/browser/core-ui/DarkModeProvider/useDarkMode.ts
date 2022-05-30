import { createContext, useCallback, useContext, useState } from "react";

type ITheme = "dark" | "light" | "system";
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
    let newTheme = theme;

    switch (theme) {
      case "light":
        newTheme = "dark";
        break;
      case "dark":
        newTheme = "system";
        break;

      default:
        newTheme = "light";
        break;
    }

    changeTheme(newTheme);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__setPreferredTheme(newTheme);
  }, [changeTheme, theme]);

  return { theme, toggleDarkMode };
};
