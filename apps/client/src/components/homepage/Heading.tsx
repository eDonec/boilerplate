import React from "react";

import { clsx } from "core-utils";

interface HeadingProps {
  title: string;
  artisticTitle: string;
  description: string;
  className?: string;
  titleClassName?: string;
  artisticTitleClassName?: string;
  descriptionClassName?: string;
}

function Heading({
  title,
  artisticTitle,
  description,
  className,
  titleClassName,
  artisticTitleClassName,
  descriptionClassName,
}: HeadingProps) {
  return (
    <div className={clsx("relative", className)}>
      <h3
        className={clsx(
          "text-extrabold absolute right-0 top-[10rem] -z-10 bg-clip-text text-6xl leading-[6rem] text-transparent md:top-[10rem] lg:top-0 lg:text-8xl lg:leading-[14rem] xl:right-20 xl:text-9xl xl:leading-[15rem]",
          "bg-gradient-to-r from-[#fc647140] via-[#4d538240] to-[#00698940]",
          "md:from-[#fc647160] md:via-[#4d538260] md:to-[#00698960]",
          "lg:from-[#fc647180] lg:via-[#4d538280] lg:to-[#00698980]",
          artisticTitleClassName
        )}
      >
        {artisticTitle}
      </h3>
      <h3
        className={clsx(
          "mb-4 text-left text-4xl sm:text-5xl xl:text-7xl",
          titleClassName
        )}
      >
        {title}
      </h3>
      <h4
        className={clsx(
          "mb-6 text-left text-xl font-normal",
          descriptionClassName
        )}
      >
        {description}
      </h4>
    </div>
  );
}

export default Heading;
