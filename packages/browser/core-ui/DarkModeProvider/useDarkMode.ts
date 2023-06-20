import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ITheme = "dark" | "light" | "system";
export const DarkModeContext = createContext<{
  theme: ITheme;
  changeTheme: (newTheme: ITheme) => void;
}>({
  theme: "system",
  changeTheme: () => null,
});

export const useDarkModeContext = () => {
  const [mode, setMode] = useState<ITheme>("system");

  useEffect(() => {
    const initialTheme =
      typeof window !== "undefined"
        ? (window?.localStorage.getItem("theme") as ITheme | undefined)
        : "system";

    setMode(initialTheme || "system");
  }, []);

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
