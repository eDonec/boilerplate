import { FC, HtmlHTMLAttributes } from "react";

import { clsx } from "core-utils";

const GlassmorphicCard: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "rounded-lg border-2 border-white bg-black/5 shadow-lg backdrop-blur-[5px]",
        className,
        {
          "p-5": !className?.match(
            // TODO : this matches everything ending with p- like gap-2 needs to be fixed
            /p-\d+|px-\d+|py-\d+|pt-\d+|pb-\d+|pl-\d+|pr-\d+/g
          ),
        }
      )}
      {...props}
    />
  );
};

export default GlassmorphicCard;

// regex to find all tailwind padding classes:
