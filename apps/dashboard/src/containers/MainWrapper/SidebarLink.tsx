import DashboardIcon from "components/Sidebar/Icons/DashboardIcon";

const SidebarLink = () => (
  <li className="mb-1 w-full pl-2">
    <div className="flex cursor-pointer items-center justify-between text-gray-400 transition-colors hover:text-gray-100">
      <div className="flex items-center">
        <DashboardIcon />
        <span className="ml-2 text-sm">Dashboard</span>
      </div>
      <div className="my-1 mx-3 flex items-center justify-center rounded bg-gray-700 py-1 px-3 text-xs ">
        5
      </div>
    </div>
  </li>
);

export default SidebarLink;
