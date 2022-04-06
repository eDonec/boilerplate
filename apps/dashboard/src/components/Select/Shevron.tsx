import { clsx } from "core-utils";

const Shevron: React.FC<{ isUp: boolean }> = ({ isUp }) => (
  <div className={clsx(["mx-3 border-l pl-2", "cursor-pointer "])}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-gray-400 dark:stroke-gray-200"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      {isUp ? (
        <polyline points="6 15 12 9 18 15" />
      ) : (
        <polyline points="6 9 12 15 18 9" />
      )}
    </svg>
  </div>
);

export default Shevron;
