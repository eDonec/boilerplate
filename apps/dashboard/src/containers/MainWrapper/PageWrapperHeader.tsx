import { IProps } from "components/Icons/DashboardIcon";

import { toPropperCase } from "helpers/toProperCase";

import Breadcrumbs from "./Breadcrumbs";

export type PageWrapperHeaderProps = {
  title: string;
  description: string;
  customIcon?: React.FC<IProps>;
  customButton?: JSX.Element;
  overrideBreadcrumbs?: { name: string; path: string }[];
};
const PageWrapperHeader: React.FC<PageWrapperHeaderProps> = ({
  customIcon: Icon,
  title,
  description,
  customButton,
  overrideBreadcrumbs,
}) => (
  <div className="mx-auto w-4/5 pt-4 md:w-11/12">
    <div className="flex justify-between">
      <div className="flex">
        <div>
          {Icon && (
            <Icon className="stroke-primary-600 dark:stroke-primary-900 dark:fill-primary-900 fill-primary-600 bg-primary-200 h-20 w-20 rounded-full p-4" />
          )}
        </div>
        <div className="my-auto table-cell pl-5 align-middle dark:text-gray-200">
          <h1 className="text-2xl font-medium">{toPropperCase(title)}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
      <div className="flex-col self-center align-middle">{customButton}</div>
    </div>
    <Breadcrumbs overrideBreadcrumbs={overrideBreadcrumbs} />
  </div>
);

export default PageWrapperHeader;
