import { clsx } from "core-utils";

import { IProps } from "./DashboardIcon";

const SystemModeIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(className && "h-5 w-5", className)}
    viewBox="0 0 15 15"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877Zm0 .95a5.673 5.673 0 0 0 0 11.346V1.827Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default SystemModeIcon;
