import { FC } from "react";

import Api from "api";
import { BlogsSDKTypes } from "blogs-sdk";
import { ScoreProvider } from "contexts/ScoreContext";
import { NextImage, SEO } from "core-next-components";
import { getImageUrl } from "core-utils";
import { format } from "date-fns";

import { GetStaticPaths, GetStaticProps } from "next";

import BlendedText from "components/BlendedText";
import BlogCard from "components/blogs/BlogCard";
import GlassmorphicCard from "components/GlassmorphicCard";
import Score from "components/Score";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (typeof params?.slug !== "string")
      throw new Error("Slug is missing from params");
    const blogData = await Api.blogsSDK.getBlogBySlug({
      params: {
        slug: params.slug,
      },
    });

    return {
      props: {
        blogData,
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
    const slugs = await Api.blogsSDK.getBlogsStaticPaths({});

    return {
      paths: slugs.map((slug) => ({
        params: {
          slug,
        },
      })),
      fallback: true,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

type BlogDetailsPageProps = {
  blogData: BlogsSDKTypes["GetBlogBySlugReturnType"];
};

const BlogDetailsPage: FC<BlogDetailsPageProps> = ({ blogData }) => {
  if (!blogData || !blogData.blog) return null;
  const { blog, relatedBlogs } = blogData;

  return (
    <ScoreProvider
      value={{
        document: blog,
        payload: {
          upvoteFunction: Api.blogsSDK.upvoteBlog.bind(Api.mainApi),
          dowvoteFunction: Api.blogsSDK.downvoteBlog.bind(Api.mainApi),
          clapFunction: Api.blogsSDK.clapBlog.bind(Api.mainApi),
          hydrationFunction: Api.blogsSDK.getBlogScore.bind(Api.mainApi),
          removeVoteFunction: Api.blogsSDK.removeUserVoteFromBlog.bind(
            Api.mainApi
          ),
        },
      }}
    >
      <SEO
        title={`${blog.title} | Mr le Psy`}
        description={blog.metaDescription}
        image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/blog/${blog.slug}`}
      />
      <div dir={blog.textDirection}>
        <div className="container mx-auto gap-4 px-6 pt-16 lg:grid lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <BlendedText
              className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl"
              text={blog.title}
            />
            <p className="text-center font-extralight italic">
              {blog.description}
            </p>
            <div className="relative mx-auto aspect-video w-full">
              <NextImage
                alt={blog.title}
                src={blog.banner.url}
                loader={({ src, width }) => getImageUrl(src, width, width)}
                fill
                imgClassName="object-cover"
              />
            </div>
            <div className="!mt-0 flex flex-col space-y-4 bg-black/5 px-4 pb-8 pt-4 backdrop-blur-[5px]">
              <p className="text-sm font-extralight">
                {`Publié le ${format(new Date(blog.createdAt), "Pp")}`}
              </p>
              <div
                id="mainContent"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <p className="text-sm italic">
                Les informations fournies sur mpsy.net ne sont en aucun cas
                destinées à remplacer la relation entre un patient et son
                psychologue. mpsy.net ne promeut aucun traitement spécifique,
                produit commercial ou service en particulier.
              </p>
              <Score className="sticky bottom-6 self-center" />
            </div>
          </div>
          <GlassmorphicCard className="sticky top-28 mb-3 mt-4 flex flex-col gap-2 self-start p-5 lg:mt-0">
            <h3 className="mb-6">Articles similaires</h3>
            {relatedBlogs.length === 0 ? (
              <p className="text-center">Aucun article similaire</p>
            ) : (
              relatedBlogs.map((blog) => (
                <BlogCard blog={blog} key={blog._id} />
              ))
            )}
          </GlassmorphicCard>
        </div>
      </div>
    </ScoreProvider>
  );
};

export default BlogDetailsPage;
