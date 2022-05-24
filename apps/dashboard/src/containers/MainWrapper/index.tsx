import { Link } from "react-router-dom";

import ReactChildrenProps from "shared-types/ReactChildren";

import Sidebar from "components/Sidebar";
import EDonecLogo from "components/Sidebar/Icons/EDonecLogo";
import SidebarSearch from "components/Sidebar/SidebarSearch";

import { UnseenNotification } from "./routes";
import SidebarLinkSection from "./SidebarLinkSection";
import { useMainWrapper } from "./useMainWrapper";

type Props = { notification?: UnseenNotification[] } & ReactChildrenProps;

// TODO: Add a hook to get the unseen notifications
const MainWrapper: React.FC<Props> = ({ children, notification }) => {
  const { filteredRoutes, handleChange } = useMainWrapper();
  // TODO: Add a header to the main wrapper that contains a search bar to be
  // handled later and a logout button and end the feature of thus wrapper

  return (
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
        This is header
        <div className="mx-auto w-11/12 px-6 sm:w-4/5">{children}</div>
      </div>
    </Sidebar>
  );
};

export default MainWrapper;
