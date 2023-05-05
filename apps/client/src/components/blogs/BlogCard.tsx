import React, { FC } from "react";

import { BlogInPaginatedResponse } from "blogs-types/routes/blogs";
import { NextImage, UnstyledLink } from "core-next-components";
import { clsx, getImageUrl } from "core-utils";
import { format } from "date-fns";

import GlassmorphicCard from "components/GlassmorphicCard";
import ClockSVG from "components/svgs/ClockSVG";

type BlogCardProps = {
  className?: string;
  blog: BlogInPaginatedResponse;
  imgClassName?: string;
};

const BlogCard: FC<BlogCardProps> = ({ className, blog, imgClassName }) => {
  return (
    <GlassmorphicCard
      dir={blog.textDirection}
      className={clsx(className, "flex overflow-hidden !p-0 @container")}
    >
      <UnstyledLink
        href={`/blogs/${blog.slug}`}
        className="flex flex-1 flex-col gap-x-2  @xl:flex-row"
      >
        <div
          className={clsx(
            "relative min-h-[200px]  @xl:min-h-[300px]  @xl:w-2/5",
            imgClassName
          )}
        >
          <NextImage
            alt={blog.title}
            src={blog.banner.url}
            loader={({ src, width }) => getImageUrl(src, width, width)}
            fill
            imgClassName="object-cover"
            className="relative h-full w-full"
            useSkeleton
            sizes="(max-width: 767px) 80vw,
            ((min-width: 768px) and (max-width: 1275px)) 50vw,
            25vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <p className="text-xs font-extralight">
            <ClockSVG className="me-2 inline" />
            {format(new Date(blog.createdAt), "Pp")}
          </p>
          <div className="text-xl font-bold hover:underline">{blog.title}</div>
          <p className="line-clamp-6 flex-1 whitespace-pre-line text-sm font-light">
            {blog.description}
          </p>
          <div className="mt-2 self-end rounded-full text-xs font-bold text-primary-700 !shadow-none">
            Lire la suite →
          </div>
        </div>
      </UnstyledLink>
    </GlassmorphicCard>
  );
};

export default BlogCard;
