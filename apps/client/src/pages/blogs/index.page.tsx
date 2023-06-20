import { FC } from "react";

import Api from "api";
import { BlogsSDKTypes } from "blogs-sdk";
import { SEO } from "core-next-components";

import { GetStaticProps } from "next";

import BlogCategorySection from "components/blogs/BlogCategorySection";
import RecentBlogsSection from "components/blogs/RecentBlogsSection";
import GradientBackgroundText from "components/GradientBackgroundText";
import Layout from "components/Layout";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await Api.blogsSDK.getGrouped({});

    return {
      props: {
        blogs: response,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      revalidate: 60,
      notFound: true,
    };
  }
};

type BlogsPageProps = {
  blogs: BlogsSDKTypes["GetGroupedReturnType"];
};

const BlogsPage: FC<BlogsPageProps> = ({ blogs }) => (
  <Layout className="relative space-y-12 px-4 py-16">
    <SEO
      title="Articles | Mr le Psy "
      description="Articles en psychologie: conseils et astuces pour une meilleure santé mentale"
      image={`${process.env.NEXT_PUBLIC_HOSTNAME}/og-image/api/main`}
    />
    <GradientBackgroundText text="إفهم روحك" />
    <h1>Apprendre avec nos Articles</h1>
    <p className="text-lg">
      Retrouvez nos différents articles en fonction de la catégorie qui vous
      correspond sur notre site. Chaque jour, nous publions un nouvel article
      vous permettant de vous enrichir davantage. Si vous appréciez un article
      en particulier, n&apos;hésitez pas à le liker et à le partager avec vos
      amis !
    </p>
    <RecentBlogsSection section={blogs.recents} />
    {blogs.categories.map((section) => (
      <BlogCategorySection section={section} key={section.category._id} />
    ))}
  </Layout>
);

export default BlogsPage;
