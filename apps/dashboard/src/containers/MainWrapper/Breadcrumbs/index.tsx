import { Link } from "react-router-dom";

import Seperator from "./Seperator";
import { useBreadcrumbs } from "./useBreadcrumbs";

const Breadcrumbs = () => {
  const { firstPath, pathList, currentPath } = useBreadcrumbs();

  if (!currentPath) return null;

  return (
    <nav className="mt-4 mb-2 font-bold" aria-label="Breadcrumb">
      <ol className=" inline-flex list-none items-center justify-between p-0 text-xs font-normal text-gray-700 transition-colors dark:text-gray-100">
        <li className="flex items-center">
          <Link
            className="hover:text-primary-900 dark:hover:text-primary-600"
            to={firstPath.path}
          >
            {firstPath.name}
          </Link>
          <Seperator />
        </li>
        {pathList.map((path) => (
          <li key={path.path} className="flex items-center">
            <Link
              className="hover:text-primary-900 dark:hover:text-primary-800"
              to={path.path}
            >
              {path.name}
            </Link>
            <Seperator />
          </li>
        ))}
        <li>
          <span
            className="font-normal text-gray-500 dark:text-gray-400"
            aria-current="page"
          >
            {currentPath.name}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
