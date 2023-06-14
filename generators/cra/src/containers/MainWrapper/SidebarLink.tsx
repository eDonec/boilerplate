import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSideBarContext } from "contexts/SideBarContext";
import ReactChildrenProps from "shared-types/ReactChildren";

type Props = {
  title: string;
  notificationCountGetter?: () => Promise<{ count: number }>;
  to: string;
} & ReactChildrenProps;

const SidebarLink: React.FC<Props> = ({
  title,
  children,
  notificationCountGetter,
  to,
}) => {
  const { setIsSideBarOpen } = useSideBarContext();

  function closeSideBar() {
    setIsSideBarOpen(false);
  }

  const [numberOfUnseenNotifications, setNumberOfUnseenNotifications] =
    useState(0);

  useEffect(() => {
    if (notificationCountGetter) {
      notificationCountGetter?.().then(({ count }) =>
        setNumberOfUnseenNotifications(count)
      );
      const interval = setInterval(() => {
        notificationCountGetter?.().then(({ count }) =>
          setNumberOfUnseenNotifications(count)
        );
      }, 30 * 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [notificationCountGetter]);

  return (
    <li className="mb-1 w-full pl-2">
      <Link onClick={closeSideBar} to={to}>
        <div className="flex cursor-pointer items-center justify-between text-gray-400 transition-colors hover:text-gray-100">
          <div className="flex items-center">
            {children}
            <span className="ml-2 text-sm">{title}</span>
          </div>
          {numberOfUnseenNotifications ? (
            <div className="mx-3 my-1 flex items-center justify-center rounded bg-gray-700 px-3 py-1 text-xs ">
              {numberOfUnseenNotifications}
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  );
};

export default SidebarLink;
