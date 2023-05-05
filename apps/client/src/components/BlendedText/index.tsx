import React, { FC } from "react";

import { clsx } from "core-utils";

type BlendedTextProps = {
  className?: string;
  text: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

const BlendedText: FC<BlendedTextProps> = ({
  className,
  text,
  element = "h1",
  ...props
}) => {
  const heading = React.createElement(
    element,
    {
      className: clsx(
        className,
        "text-extrabold text-black text-transparent bg-clip-text",
        "bg-gradient-to-r from-[#fc647140] via-[#4d538240] to-[#00698940]",
        "md:from-[#fc647160] md:via-[#4d538260] md:to-[#00698960]",
        "lg:from-[#fc647180] lg:via-[#4d538280] lg:to-[#00698980]"
      ),
      ...props,
    },
    text
  );

  return heading;
};

export default BlendedText;
