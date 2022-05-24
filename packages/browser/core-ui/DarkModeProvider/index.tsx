import React from "react";

import {
  DarkModeContext,
  useDarkMode,
  useDarkModeContext,
} from "./useDarkMode";

const DarkModeProvider: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ className, children }) => {
  const { value } = useDarkModeContext();

  return (
    <DarkModeContext.Provider value={value}>
      <DarkModeWrapper className={className}>{children}</DarkModeWrapper>
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;

const DarkModeWrapper: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({
  className = "dark:bg-dark bg-gray-50 min-h-screen transition-[background-color] duration-700",
  children,
}) => {
  const { theme } = useDarkMode();

  return (
    <main className={theme}>
      <div className={className}>{children}</div>
    </main>
  );
};
