import { Link } from "react-router-dom";

import Seperator from "./Seperator";
import { useBreadcrumbs } from "./useBreadcrumbs";

interface Props {
  overrideBreadcrumbs?: { name: string; path: string }[];
}

/**
 * Description JSDOC
 * @param {Props} props
 * @param {Props["overrideBreadcrumbs"]} props.overrideBreadcrumbs - Optional array of breadcrumbs to override. MUST be ordered
 * @memberof MainWrapper/Breadcrumbs
 * @example
 * <Breadcrumbs />
 * @example
 * <Breadcrumbs overrideBreadcrumbs={[{ name: 'Home', path: '/' }]} />
 * @example
 * <Breadcrumbs overrideBreadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
 * @example
 * <Breadcrumbs overrideBreadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }, { name: 'Contact', path: '/contact' }]} />
 * @example
 */
const Breadcrumbs: React.FC<Props> = ({ overrideBreadcrumbs }) => {
  const { firstPath, pathList, currentPath } =
    useBreadcrumbs(overrideBreadcrumbs);

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
