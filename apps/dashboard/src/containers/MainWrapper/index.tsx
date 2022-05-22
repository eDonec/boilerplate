import { Link } from "react-router-dom";

import ReactChildrenProps from "shared-types/ReactChildren";

import Sidebar from "components/Sidebar";
import EDonecLogo from "components/Sidebar/Icons/EDonecLogo";
import SidebarSearch from "components/Sidebar/SidebarSearch";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { UnseenNotification } from "./routes";
import SidebarLink from "./SidebarLink";
import SidebarLinkSection from "./SidebarLinkSection";
import { useMainWrapper } from "./useMainWrapper";

type Props = { notification?: UnseenNotification[] } & ReactChildrenProps;

// TODO: Add a hook to get the unseen notifications
const MainWrapper: React.FC<Props> = ({ children, notification }) => {
  const { filteredRoutes, handleChange } = useMainWrapper();
  // TODO: Add a header to the main wrapper that contains a search bar to be
  // handled later and a logout button and end the feature of thus wrapper

  return (
    <Sidebar page={children}>
      <Link to="/">
        <EDonecLogo />
      </Link>
      <SidebarSearch onChange={handleChange} />
      {filteredRoutes.map((section) => (
        <SidebarLinkSection key={section.title} title={section.title}>
          {section.links.map(({ title, to, Icon, privileges }) => (
            <AccessProtectedWrapper
              key={to}
              ressource={privileges?.ressource}
              privileges={privileges?.privileges}
            >
              <SidebarLink
                to={to}
                title={title}
                numberOfUnseenNotifications={
                  notification?.find((notifiy) => notifiy.route === title)
                    ?.numberOfUnseenNotifications
                }
              >
                {Icon}
              </SidebarLink>
            </AccessProtectedWrapper>
          ))}
        </SidebarLinkSection>
      ))}
    </Sidebar>
  );
};

export default MainWrapper;
