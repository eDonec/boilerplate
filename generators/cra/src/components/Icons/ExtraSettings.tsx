import { clsx } from "core-utils";

import { IProps } from "./DashboardIcon";

const ExtraSettings: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx(!className && "h-5 w-5", className)}
    viewBox="0 0 24 24"
    stroke="none"
    style={{
      // @ts-expect-error FIXME: Type '{ enableBackground: string; }' is not assignable to type 'CSSProperty'.
      enableBackground: "new 0 0 24 24",
    }}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="4.71" r="2.17" />
    <circle cx="12" cy="12" r="2.17" />
    <circle cx="12" cy="19.29" r="2.17" />
  </svg>
);

export default ExtraSettings;
