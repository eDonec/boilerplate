import { FC, useMemo } from "react";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import Api from "api";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { SEO } from "core-next-components";
import { Button } from "core-ui";
import { clsx } from "core-utils";

import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { QueryKeys } from "constants/queryKeys";

import BlendedText from "components/BlendedText";
import BlogCard from "components/blogs/BlogCard";
import GlassmorphicCard from "components/GlassmorphicCard";
import MinimalThreadListItem from "components/threads/MinimalThreadListItem";

import { useInfiniteBlogsByCategoryQuery } from "hooks/queries/useInfiniteBlogsByCategoryQuery";
import { useInfiniteThreadsQuery } from "hooks/queries/useInfiniteThreadsQuery";
import { getThreadSortingFromQuery } from "helpers/getThreadSortingFromQuery";
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (typeof params?.slug !== "string")
      throw new Error("Slug is missing from params");
    const queryClient = new QueryClient();
    const [category, categories] = await Promise.all([
      Api.categorySDK.getBySlug({
        params: {
          slug: params.slug,
        },
      }),
      Api.categorySDK.getUnpaginatedCategories({}),
      queryClient.fetchInfiniteQuery([QueryKeys.BLOGS, params.slug], () =>
        Api.blogsSDK.getByCategory({
          query: {
            slug: params.slug as string,
          },
        })
      ),
    ]);

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        category,
        categories,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
};
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = await Api.categorySDK.getStaticPaths({});

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

type BlogsByCategoryPageProps = {
  category: LeanCategoryDocument;
  categories: LeanCategoryDocument[];
};

const BlogsByCategoryPage: FC<BlogsByCategoryPageProps> = ({
  category,
  categories,
}) => {
  const router = useRouter();

  const { routerCategory } = useMemo(() => {
    return {
      currentSort: getThreadSortingFromQuery(router.query),
      routerCategory:
        typeof router.query.slug === "string" ? router.query.slug : undefined,
    };
  }, [router.query]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteBlogsByCategoryQuery(
    router.query.slug as string
  );

  const {
    data: threadsData,
    hasNextPage: threadsHasNextPage,
    fetchNextPage: threadsFetchNextPage,
  } = useInfiniteThreadsQuery({
    category: routerCategory,
  });

  if (!categories || !category) return null;

  return (
    <div className="container mx-auto my-14 flex flex-col gap-4 overflow-x-hidden px-4 md:overflow-x-visible">
      <SEO
        title={`Articles dans la catégorie ${category.title} | Mr le Psy`}
        description={category.description}
        image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
      />
      <BlendedText
        text={category.title}
        element="h2"
        className="mb-3 text-6xl md:-ml-16 md:text-9xl"
      />
      <div className="container mx-auto px-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {data?.pages
              .map((page) => page.items)
              .flat()
              .map((blog) => (
                <BlogCard
                  imgClassName="flex-[0.5]"
                  blog={blog}
                  key={blog._id}
                />
              ))}

            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                className="self-center px-8"
              >
                Voir plus
              </Button>
            )}
          </div>
          <GlassmorphicCard className="space-y-8">
            <div className="flex flex-col gap-2">
              <h3>Catégories</h3>
              {categories.map((category, index) => (
                <div key={category._id}>
                  <Link
                    className={clsx(
                      "text-sm font-semibold transition-colors hover:text-primary-600"
                    )}
                    href={`/blogs/category/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                  {index !== categories.length - 1 && (
                    <hr className="mx-auto mt-2 w-4/5 border-white" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h3>Publications</h3>
              {threadsData?.pages
                .map((page) => page.items)
                .flat()
                .map((item) => (
                  <MinimalThreadListItem
                    key={item._id}
                    thread={item}
                    textClassName="!line-clamp-3 md:!line-clamp-3"
                  />
                ))}
              {threadsHasNextPage && (
                <Button onClick={() => threadsFetchNextPage()}>
                  Voir plus
                </Button>
              )}
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </div>
  );
};

export default BlogsByCategoryPage;
