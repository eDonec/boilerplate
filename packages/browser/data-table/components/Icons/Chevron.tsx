import { clsx } from "core-utils";

type ChevronProps = {
  className?: string;
};

const Chevron: React.FC<ChevronProps> = ({ className }) => (
  <svg
    className={clsx("h-4 w-4 min-w-fit", className)}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M22.7524 5L12 16.356L1.24759 5L0 6.32635L12 19L24 6.32635L22.7524 5Z" />
  </svg>
);

export default Chevron;
