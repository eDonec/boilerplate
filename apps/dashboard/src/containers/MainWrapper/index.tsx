import { Link } from "react-router-dom";

import SEO from "core-cra-components/SEO";
import ReactChildrenProps from "shared-types/ReactChildren";

import EDonecLogo from "components/Icons/EDonecLogo";
import Sidebar from "components/Sidebar";
import SidebarSearch from "components/Sidebar/SidebarSearch";
import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";

import { toPropperCase } from "helpers/toProperCase";

import Navbar from "./Navbar";
import PageWrapperHeader, { PageWrapperHeaderProps } from "./PageWrapperHeader";
import { UnseenNotification } from "./routes";
import SidebarLinkSection from "./SidebarLinkSection";
import { useMainWrapper } from "./useMainWrapper";

type Props = {
  notification?: UnseenNotification[];
} & PageWrapperHeaderProps &
  ReactChildrenProps;

// TODO: Add a hook to get the unseen notifications
const MainWrapper: React.FC<Props> = ({
  children,
  notification,
  customIcon: CustomIcon,
  ...restOfPageWrapperHeaderProps
}) => {
  const {
    filteredRoutes,
    handleChange,
    currentRouteIcon: Icon,
  } = useMainWrapper();
  // TODO: Add a header to the main wrapper that contains a search bar to be
  // handled later and a logout button and end the feature of thus wrapper

  return (
    <>
      <SEO
        title={toPropperCase(restOfPageWrapperHeaderProps.title)}
        description={restOfPageWrapperHeaderProps.description}
      />

      <PrivateWrapper>
        <div className="flex-no-wrap flex">
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
          <div className="h-full w-full md:max-w-[calc(100vw-18rem)]">
            <Navbar />
            <div className="mb-3 bg-gray-200 pb-3 shadow-2xl dark:bg-gray-700">
              <PageWrapperHeader
                customIcon={CustomIcon || Icon}
                {...restOfPageWrapperHeaderProps}
              />
            </div>
            <div className="max:w-4/5 max:md:w-11/12 container mx-auto w-4/5 md:w-11/12">
              {children}
            </div>
          </div>
        </div>
      </PrivateWrapper>
    </>
  );
};

export default MainWrapper;
