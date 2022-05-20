import { useState } from "react";

import ReactChildrenProps from "shared-types/ReactChildren";

import Sidebar from "components/Sidebar";
import EDonecLogo from "components/Sidebar/Icons/EDonecLogo";
import SidebarSearch from "components/Sidebar/SidebarSearch";

import { routes } from "./routes";
import SidebarLink from "./SidebarLink";
import SidebarLinkSection from "./SidebarLinkSection";

type Props = ReactChildrenProps;
const MainWrapper: React.FC<Props> = ({ children }) => {
  const [filteredRoutes] = useState(routes);
  const handleChange = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  return (
    <Sidebar page={children}>
      <EDonecLogo />
      <SidebarSearch onChange={handleChange} />
      {filteredRoutes.map((section) => (
        <SidebarLinkSection key={section.title} title={section.title}>
          {section.links.map((link) => (
            <SidebarLink key={link.to} />
          ))}
        </SidebarLinkSection>
      ))}
    </Sidebar>
  );
};

export default MainWrapper;
