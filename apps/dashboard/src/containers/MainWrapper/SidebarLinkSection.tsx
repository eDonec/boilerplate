import React from "react";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { Routes, UnseenNotification } from "./routes";
import SidebarLink from "./SidebarLink";

type Props = {
  title: string;
  links: Routes[number]["links"];
  notification?: UnseenNotification[];
};
const SidebarLinkSection: React.FC<Props> = ({
  title: sectionTitle,
  links,
  notification,
}) => (
  <>
    <div className="py-3 pl-4 text-gray-50">{sectionTitle}</div>
    <ul className="pl-4">
      {links.map(({ title, to, Icon, privileges }) => (
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
    </ul>
  </>
);

export default SidebarLinkSection;
