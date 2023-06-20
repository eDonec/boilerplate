import React from "react";

import { clsx } from "core-utils";

interface IProps {
  text: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

const GradientBackgroundText: React.FC<IProps> = ({
  text,
  className,
  element = "h3",
}) => {
  const heading = React.createElement(
    element,
    {
      className: clsx(
        "text-extrabold absolute right-0 top-0 -z-10 bg-clip-text text-6xl leading-[6rem] md:top-[10rem] lg:top-0 lg:text-8xl lg:leading-[14rem] xl:text-9xl xl:leading-[15rem]",
        "bg-gradient-to-r from-[#fc647140] via-[#4d538240] to-[#00698940]",
        "md:from-[#fc647160] md:via-[#4d538260] md:to-[#00698960]",
        "lg:from-[#fc647180] lg:via-[#4d538280] lg:to-[#00698980]",
        className
      ),
    },
    text
  );

  return heading;
};

export default GradientBackgroundText;
