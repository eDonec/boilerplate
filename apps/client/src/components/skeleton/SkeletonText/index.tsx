import { clsx } from "core-utils";

type SkeletonTextProps = {
  className?: string;
};

const SkeletonText = ({ className }: SkeletonTextProps) => {
  return (
    <div
      className={clsx("my-2 h-4 animate-pulse rounded bg-gray-300", className)}
    />
  );
};

export default SkeletonText;
