import React, { FC } from "react";

import { BlogsSDKTypes } from "blogs-sdk";
import { ButtonLink } from "core-next-components";
import { clsx } from "core-utils";

import BlendedText from "components/BlendedText";

import BlogCard from "./BlogCard";

type BlogsCategorySectionProps = {
  className?: string;
  section: BlogsSDKTypes["GetGroupedReturnType"]["categories"][number];
};
const BlogCategorySection: FC<BlogsCategorySectionProps> = ({
  className,
  section,
}) => {
  return (
    <div className={clsx(className, "flex flex-col")}>
      <BlendedText
        text={section.category.title}
        className="text-2xl md:mb-1 md:text-8xl xl:-ml-16"
        element="h2"
      />
      <BlendedText
        text={section.category.description}
        className="mb-6 max-w-[40ch] font-light text-gray-800 md:text-2xl"
        element="p"
      />
      <div
        className={clsx("grid grid-flow-row-dense gap-3", {
          "md:grid-cols-2": section.items.length === 2,
          "md:grid-cols-3": section.items.length >= 3,
        })}
      >
        {section.items.map((blog, _, array) => (
          <BlogCard
            blog={blog}
            key={blog._id}
            className={clsx({
              "col-span-3": array.length === 1,
            })}
          />
        ))}
      </div>
      <ButtonLink
        className="hover-gradient-bg mt-4  rounded-md px-4 py-2 text-sm text-white md:ml-auto"
        href={`/blogs/category/${section.category.slug}`}
      >
        {`Voir tous les articles "${section.category.title}"`}
      </ButtonLink>
    </div>
  );
};

export default BlogCategorySection;
