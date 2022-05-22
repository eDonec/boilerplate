import { Link } from "react-router-dom";

import ReactChildrenProps from "shared-types/ReactChildren";

type Props = {
  title: string;
  numberOfUnseenNotifications?: number;
  to: string;
} & ReactChildrenProps;

const SidebarLink: React.FC<Props> = ({
  title,
  children,
  numberOfUnseenNotifications,
  to,
}) => (
  <li className="mb-1 w-full pl-2">
    <Link to={to}>
      <div className="flex cursor-pointer items-center justify-between text-gray-400 transition-colors hover:text-gray-100">
        <div className="flex items-center">
          {children}
          <span className="ml-2 text-sm">{title}</span>
        </div>
        {numberOfUnseenNotifications && (
          <div className="my-1 mx-3 flex items-center justify-center rounded bg-gray-700 py-1 px-3 text-xs ">
            {numberOfUnseenNotifications}
          </div>
        )}
      </div>
    </Link>
  </li>
);

export default SidebarLink;
