import { FC, HtmlHTMLAttributes } from "react";

import { clsx } from "core-utils";

const Card: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(
      "rounded-lg border-2 border-white bg-white p-5 shadow-lg dark:border-slate-600 dark:bg-slate-800 ",
      className
    )}
    {...props}
  />
);

export default Card;
