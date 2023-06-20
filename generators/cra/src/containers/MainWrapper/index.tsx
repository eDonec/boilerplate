import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { SideBarProvider } from "contexts/SideBarContext";
import SEO from "core-cra-components/SEO";

import { IProps } from "components/Icons/DashboardIcon";
import EDonecLogo from "components/Icons/EDonecLogo";
import Sidebar from "components/Sidebar";
import SidebarSearch from "components/Sidebar/SidebarSearch";
import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";

import { toPropperCase } from "helpers/toProperCase";

import Navbar from "./Navbar";
import PageWrapperHeader from "./PageWrapperHeader";
import { UnseenNotification } from "./routes";
import SidebarLinkSection from "./SidebarLinkSection";
import { useMainWrapper } from "./useMainWrapper";

export type PageProps = {
  title: string;
  description: string;
  customIcon?: React.FC<IProps> | undefined;
  customButton?: JSX.Element | undefined;
  overrideBreadcrumbs?: { name: string; path: string }[];
};
// TODO: Add a hook to get the unseen notifications
const notification: UnseenNotification[] | undefined = undefined;

const MainWrapper = () => {
  const [props, initPage] = useState<PageProps>({
    title: "Dashboard",
    description: "eDonec Dashboard",
  });
  const {
    filteredRoutes,
    handleChange,
    currentRouteIcon: Icon,
  } = useMainWrapper();

  const {
    customIcon: CustomIcon,
    title,
    description,
    customButton,
    overrideBreadcrumbs,
  } = props;

  return (
    <PrivateWrapper>
      <SEO title={toPropperCase(title)} description={description} />

      <div className="flex-no-wrap flex">
        <SideBarProvider>
          <Sidebar>
            <Link to="/">
              <div className="m-auto flex h-16 justify-center  border-b border-gray-500">
                <EDonecLogo className="self-center align-middle" />
              </div>
            </Link>
            <SidebarSearch onChange={handleChange} />
            {filteredRoutes.map((section) => (
              <SidebarLinkSection
                notification={notification}
                links={section.links}
                key={section.title}
                title={section.title}
              />
            ))}
          </Sidebar>
        </SideBarProvider>
        <div className="h-full w-full md:max-w-[calc(100vw-18rem)]">
          <Navbar />
          <div className="mb-3 bg-gray-200 pb-3 shadow-2xl dark:bg-gray-700">
            <PageWrapperHeader
              overrideBreadcrumbs={overrideBreadcrumbs}
              customIcon={CustomIcon || Icon}
              title={title}
              description={description}
              customButton={customButton}
            />
          </div>
          <div className="max:w-4/5 max:md:w-11/12 container mx-auto w-4/5 pb-20 md:w-11/12">
            <Outlet context={initPage} />
          </div>
        </div>
      </div>
    </PrivateWrapper>
  );
};

export default MainWrapper;
