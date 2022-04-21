import { clsx } from "core-utils";

export interface IProps {
  handleClose: () => void;
}
export const CloseButton = ({ handleClose }: IProps) => (
  <button
    className={clsx([
      "absolute",
      "top-0 right-0 m-3",
      "cursor-pointer",
      "text-gray-400 dark:text-gray-200",
      "transition",
      "duration-150 ease-in-out",
    ])}
    type="button"
    onClick={handleClose}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Close"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1={18} y1={6} x2={6} y2={18} />
      <line x1={6} y1={6} x2={18} y2={18} />
    </svg>
  </button>
);
export default CloseButton;
