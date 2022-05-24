import { clsx } from "core-utils";

import { IProps } from "./DashboardIcon";

const AddIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("h-4 w-4 min-w-fit", className)}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M24.01,11.04l0,2.39c0,0.38-0.19,0.57-0.57,0.57l-9.44,0c-0.15,0-0.23,0.08-0.23,0.23l0,9.21c0,0.38-0.19,0.57-0.57,0.57
		l-2.39,0c-0.38,0-0.57-0.19-0.57-0.57l0-9.21c0-0.15-0.08-0.23-0.23-0.23l-9.44,0c-0.38,0-0.57-0.19-0.57-0.57l0-2.39
		c0-0.38,0.19-0.57,0.57-0.57l9.44,0c0.15,0,0.23-0.08,0.23-0.23l0-9.66c0-0.38,0.19-0.57,0.57-0.57l2.39,0
		c0.38,0,0.57,0.19,0.57,0.57l0,9.66c0,0.15,0.07,0.23,0.23,0.23l9.44,0C23.81,10.47,24.01,10.66,24.01,11.04z"
    />
  </svg>
);

export default AddIcon;
