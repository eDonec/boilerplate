import React from "react";

import { useSideBarContext } from "contexts/SideBarContext";
import { clsx } from "core-utils";
import ReactChildrenProps from "shared-types/ReactChildren";

import SidebarMobileOpenButtonIcon from "components/Icons/SidebarMobileOpenButtonIcon";

type Props = ReactChildrenProps;

const Sidebar: React.FC<Props> = ({ children }) => {
  const { isSideBarOpen, setIsSideBarOpen } = useSideBarContext();

  function toggleSidebar() {
    setIsSideBarOpen((prev) => !prev);
  }

  function closeSidebar() {
    setIsSideBarOpen(false);
  }

  return (
    <>
      <div className="md:min-w-[18rem]" />
      <div
        className={clsx(
          "fixed z-20 max-h-screen min-h-screen w-72 min-w-[18rem] flex-col justify-between shadow transition duration-150 ease-in-out md:flex",
          { "translate-x-[-18rem]": !isSideBarOpen },
          "md:translate-x-0"
        )}
      >
        <div className="absolute left-0 top-0 h-screen w-72 bg-gray-900 shadow">
          <div
            className="absolute right-0 -mr-10 mt-16 flex h-10 w-10 cursor-pointer items-center justify-center rounded-br rounded-tr bg-gray-900 shadow md:hidden"
            id="mobile-toggler"
            onClick={toggleSidebar}
          >
            <SidebarMobileOpenButtonIcon isOpen={isSideBarOpen} />
          </div>
          <div className="scrollbar max-h-screen overflow-auto">{children}</div>
        </div>
      </div>
      <div
        onClick={closeSidebar}
        className={clsx(
          "fixed  left-0 top-0 z-10 h-screen w-screen bg-white/30 opacity-0 backdrop-blur-sm transition-[opacity] md:hidden ",
          { "pointer-events-none": !isSideBarOpen },
          { "opacity-100": isSideBarOpen }
        )}
      />
    </>
  );
};

export default Sidebar;
