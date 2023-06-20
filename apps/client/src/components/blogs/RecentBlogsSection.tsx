import React, { FC } from "react";

import { BlogsSDKTypes } from "blogs-sdk";
import { clsx } from "core-utils";

import GradientBackgroundText from "components/GradientBackgroundText";

import BlogCard from "./BlogCard";

type RecentBlogsSectionProps = {
  className?: string;
  section: BlogsSDKTypes["GetGroupedReturnType"]["recents"];
};

const RecentBlogsSection: FC<RecentBlogsSectionProps> = ({
  className,
  section,
}) => {
  return (
    <div className={clsx(className, "relative pt-44")}>
      <GradientBackgroundText
        text="À la une"
        element="h2"
        className="left-0 mb-3 text-6xl md:text-9xl xl:-ml-16"
      />
      <div
        className={clsx(
          "grid grid-flow-row-dense gap-3 md:grid-cols-2 xl:grid-cols-4"
        )}
      >
        {section.map((blog, index) => (
          <BlogCard
            blog={blog}
            key={blog._id}
            className={clsx({
              "md:col-span-2 xl:col-span-4": index === 0,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentBlogsSection;
