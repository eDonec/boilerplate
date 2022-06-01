import { clsx } from "core-utils";

type ChevronEndProps = {
  className?: string;
};

const ChevronEnd: React.FC<ChevronEndProps> = ({ className }) => (
  <svg
    className={clsx("h-4 w-4", className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
  >
    <path
      stroke="none"
      d="M22.7524 5L12 16.356L1.24759 5L0 6.32635L12 19L24 6.32635L22.7524 5Z"
    />
    <line fill="none" y1="23" x2="24" y2="23" strokeWidth="2" />
  </svg>
);

export default ChevronEnd;
