import React from "react";

import { AuthGuarded, useAuthClient } from "authenticator";
import { useSideBarContext } from "contexts/SideBarContext";
import { UnstyledLink } from "core-next-components";
import { clsx } from "core-utils";

import AppLogo from "components/svgs/AppLogo/indesx";
import CloseSVG from "components/svgs/CloseSVG";

import MobileFooter from "./Footer";
import MobileProfile from "./Profile";
import { ILink } from "../NavbarLink";
import NavbarLinkList from "../NavbarLinkList";

const MobileSidebar = ({ links }: { links: ILink[] }) => {
  const { setIsSideBarOpen, isSideBarOpen } = useSideBarContext();
  const authClient = useAuthClient();

  function handleCloseSidebar() {
    setIsSideBarOpen(false);
  }

  return (
    <div
      className={clsx(
        isSideBarOpen ? "fixed" : "hidden",
        "navbar-menu bottom-0 left-0 top-0 z-50 w-5/6 max-w-sm lg:hidden"
      )}
    >
      <div
        onClick={handleCloseSidebar}
        className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
      />
      <nav className="relative flex h-full w-full flex-col overflow-y-auto border-r bg-white/30 px-6 py-6 backdrop-blur-xl">
        <div className="mb-8 flex items-center">
          <UnstyledLink
            aria-label="Go to homepage"
            className="mr-auto text-3xl font-semibold leading-none"
            href="/"
          >
            <AppLogo className="h-10" />
          </UnstyledLink>
          <button onClick={handleCloseSidebar} className="navbar-close">
            <CloseSVG />
          </button>
        </div>
        <div>
          <ul>
            <NavbarLinkList links={links} />
          </ul>
          {!authClient && (
            <>
              <hr />
              <div className=" mx-auto mt-4 w-5/6 pt-6">
                <AuthGuarded>
                  <div className="inline-block w-full rounded border border-primary-300 bg-primary-700 px-4 py-3 text-center text-xs font-semibold leading-none text-primary-100 hover:border-primary-700 hover:text-primary-700">
                    Se connecter
                  </div>
                </AuthGuarded>
              </div>
            </>
          )}
        </div>
        <div className="mt-auto">
          <MobileFooter />
          <MobileProfile handleCloseSidebar={handleCloseSidebar} />
        </div>
      </nav>
    </div>
  );
};

export default MobileSidebar;
