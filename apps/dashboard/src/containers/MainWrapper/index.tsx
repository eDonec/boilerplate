import { Link } from "react-router-dom";

import ReactChildrenProps from "shared-types/ReactChildren";

import { IProps } from "components/Icons/DashboardIcon";
import EDonecLogo from "components/Icons/EDonecLogo";
import Sidebar from "components/Sidebar";
import SidebarSearch from "components/Sidebar/SidebarSearch";
import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";

import { toPropperCase } from "helpers/toProperCase";

import Breadcrumbs from "./Breadcrumbs";
import { UnseenNotification } from "./routes";
import SidebarLinkSection from "./SidebarLinkSection";
import { useMainWrapper } from "./useMainWrapper";

type Props = {
  title: string;
  description: string;
  notification?: UnseenNotification[];
  customIcon?: React.FC<IProps>;
  customButton?: JSX.Element;
} & ReactChildrenProps;

// TODO: Add a hook to get the unseen notifications
const MainWrapper: React.FC<Props> = ({
  children,
  notification,
  title,
  description,
  customIcon: CustomIcon,
  customButton,
}) => {
  const {
    filteredRoutes,
    handleChange,
    currentRouteIcon: Icon,
  } = useMainWrapper();
  // TODO: Add a header to the main wrapper that contains a search bar to be
  // handled later and a logout button and end the feature of thus wrapper

  return (
    <PrivateWrapper>
      <Sidebar
        links={
          <>
            <Link to="/">
              <EDonecLogo />
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
          </>
        }
      >
        <div className="h-full w-full">
          <div className="mx-auto flex w-4/5 justify-between pt-4 md:w-11/12">
            <div>
              <div className="flex">
                <div>
                  {CustomIcon ? (
                    <CustomIcon className="stroke-primary-600 dark:stroke-primary-900 dark:fill-primary-900 fill-primary-600 bg-primary-100 h-20 w-20 rounded-full p-4" />
                  ) : (
                    Icon && (
                      <Icon className="stroke-primary-600 dark:stroke-primary-900 dark:fill-primary-900 fill-primary-600 bg-primary-100 h-20 w-20 rounded-full p-4" />
                    )
                  )}
                </div>
                <div className="my-auto table-cell pl-5 align-middle dark:text-gray-200">
                  <h1 className="text-2xl font-medium">
                    {toPropperCase(title)}
                  </h1>
                  <p className="text-sm text-gray-400 dark:text-gray-300">
                    {description}
                  </p>
                </div>
              </div>
              <Breadcrumbs />
            </div>
            <div className="flex-col self-center align-middle">
              {customButton}
            </div>
          </div>
          <div className="mx-auto w-4/5 md:w-11/12">{children}</div>
        </div>
      </Sidebar>
    </PrivateWrapper>
  );
};

export default MainWrapper;
