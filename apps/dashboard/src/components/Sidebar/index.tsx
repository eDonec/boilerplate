import React, { useState } from "react";

import { clsx } from "core-utils";
import ReactChildrenProps from "shared-types/ReactChildren";

import SidebarMobileOpenButtonIcon from "./Icons/SidebarMobileOpenButtonIcon";

type Props = { page: React.ReactNode } & ReactChildrenProps;

const Sidebar: React.FC<Props> = ({ children, page }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-no-wrap flex">
      <div className="md:min-w-[18rem]" />
      <div
        className={clsx(
          "fixed z-10 max-h-screen min-h-screen w-72 min-w-[18rem] flex-col justify-between shadow transition duration-150 ease-in-out md:flex",
          { "translate-x-[-260px]": !isOpen },
          "md:translate-x-0"
        )}
      >
        <div className="absolute top-0 left-0 h-screen w-72 bg-gray-900 shadow">
          <div
            className="absolute right-0 mt-16 -mr-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-tr rounded-br bg-gray-800 shadow md:hidden"
            id="mobile-toggler"
            onClick={() => setIsOpen(!isOpen)}
          >
            <SidebarMobileOpenButtonIcon isOpen={isOpen} />
          </div>
          <div className="scrollbar max-h-screen overflow-auto">{children}</div>
        </div>
      </div>
      <div className="container mx-auto h-64 w-11/12 py-10 px-6 sm:w-4/5">
        <div className="h-full w-full">
          <div
            onClick={() => setIsOpen(false)}
            className={clsx(
              "fixed top-0 left-0 z-0 h-screen w-screen bg-white/30 opacity-0 backdrop-blur-sm transition-[opacity] md:hidden ",
              { "pointer-events-none": !isOpen },
              { "opacity-100": isOpen }
            )}
          />
          {page}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
