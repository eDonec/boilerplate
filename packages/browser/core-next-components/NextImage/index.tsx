import { useState } from "react";

import { getImageUrl } from "core-utils";
import clsx from "core-utils/clsx";

import Image, { ImageProps } from "next/image";

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
} & (
  | { width: string | number; height: string | number }
  | { fill: true; width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = useState(useSkeleton ? "loading" : "complete");
  const widthIsSet = className?.includes("w-") ?? false;
  const blurData = {
    placeholder:
      typeof src === "string" ? ("blur" as const) : ("empty" as const),
    blurDataURL: typeof src === "string" ? getImageUrl(src, 4, 4) : undefined,
  };

  return (
    <figure
      style={!widthIsSet && width ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsx(
          imgClassName,
          { "lds-dual-ring": status === "loading" },
          blurClassName
        )}
        src={src}
        width={width}
        loading="lazy"
        height={height}
        alt={alt}
        {...blurData}
        onLoadingComplete={() => setStatus("complete")}
        {...rest}
      />
    </figure>
  );
}
