import { clsx } from "core-utils";

export interface IProps {
  className?: string;
}
const DashboardIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("h-4 w-4", className)}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect fill="none" x={4} y={4} width={6} height={6} rx={1} />
    <rect fill="none" x={14} y={4} width={6} height={6} rx={1} />
    <rect fill="none" x={4} y={14} width={6} height={6} rx={1} />
    <rect fill="none" x={14} y={14} width={6} height={6} rx={1} />
  </svg>
);

export default DashboardIcon;
