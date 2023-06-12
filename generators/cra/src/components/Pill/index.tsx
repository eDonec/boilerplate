import { FC, PropsWithChildren } from "react";

import { clsx } from "core-utils";

type PillProps = {
  className?: string;
};

const Pill: FC<PropsWithChildren<PillProps>> = ({ className, children }) => (
  <div
    className={clsx(
      "flex items-center  justify-center rounded-full px-2 py-1 text-center text-xs font-bold uppercase text-gray-500 dark:text-white ",
      className
    )}
  >
    <span>{children}</span>
  </div>
);

export default Pill;
