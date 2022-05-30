import React from "react";

import { DarkModeContext, useDarkModeContext } from "./useDarkMode";

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
  className = "min-h-screen transition-[background-color]",
  children,
}) => <main className={className}>{children}</main>;
