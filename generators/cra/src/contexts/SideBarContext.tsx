import { createContext, PropsWithChildren, useContext, useState } from "react";

interface SideBarContextProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContext = createContext<SideBarContextProps | null>(null);

export function SideBarProvider({ children }: PropsWithChildren<unknown>) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSideBarContext() {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }

  return context;
}
