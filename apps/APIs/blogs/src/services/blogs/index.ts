import { LeanBlogDocument } from "blogs-types/models/Blog";
import {
  BlogInPaginatedResponse,
  BlogsRouteTypes,
} from "blogs-types/routes/blogs";
import { NotFoundError } from "custom-error";
import producer from "events/producer";
import { asyncCreateSlugFromString } from "http-server";
import Blog from "models/Blog";
import { hotScoreAggregation } from "score-helpers";
import { ACCESS_RESSOURCES, SortDirection } from "shared-types";

import { getBulkCategoriesDetails } from "helpers/getBulkCategoriesDetails";
import { getCategoryIdBySlug } from "helpers/getCategoryIdBySlug";
import { getUploadedImagesFromHtmlInput } from "helpers/getUploadedImagesFromHtmlInput";

export const getBlogs = async ({
  keyword = "",
  ...query
}: BlogsRouteTypes["/blogs/"]["GET"]["query"]): Promise<
  BlogsRouteTypes["/blogs/"]["GET"]["response"]
> =>
  Blog.findPaginated(query, [
    {
      $match: {
        title: { $regex: keyword, $options: "i" },
      },
    },
    {
      $addFields: {
        upvotes: { $size: "$upvotes" },
        downvotes: { $size: "$downvotes" },
      },
    },
  ]);

export const addBlog = async (
  blogData: BlogsRouteTypes["/blogs/"]["POST"]["body"]
) => {
  const slug = await asyncCreateSlugFromString(blogData.title, Blog);
  const {
    content,
    banner: { url },
  } = await Blog.create({ ...blogData, slug });

  const imageKeysToPersist = getUploadedImagesFromHtmlInput(content);

  imageKeysToPersist.push(url.split("/").pop() || url);
  producer.emit.BlogCreated({ filesToPersist: imageKeysToPersist });
};

const RELATED_BLOGS_COUNT = 5;

async function getRelatedBlogs(blog: LeanBlogDocument) {
  const {
    sort: { "sort-direction": sortDirection, "sort-field": sortField },
    pipeLines,
    projection,
  } = hotScoreAggregation();

  const relatedThreads = await Blog.aggregate([
    {
      $match: {
        $and: [
          {
            _id: { $ne: blog._id },
          },
          {
            $or: [
              {
                mainCategory: blog.mainCategory,
              },
              {
                secondaryCategories: blog.mainCategory,
              },
            ],
          },
        ],
      },
    },
    {
      $addFields: {
        upvotes: { $size: "$upvotes" },
        downvotes: { $size: "$downvotes" },
      },
    },
    ...pipeLines,
    {
      $sort: {
        [sortField]: sortDirection === SortDirection.ASC ? 1 : -1,
      },
    },
    {
      $limit: RELATED_BLOGS_COUNT,
    },
    {
      $project: {
        ...projection,
        metaTitle: 0,
      },
    },
  ]);

  return relatedThreads;
}

export const getBlogBySlug = async (
  slug: string,
  authId?: string,
  omitRelated = false
): Promise<BlogsRouteTypes["/blogs/:slug"]["GET"]["response"]> => {
  const blog = await Blog.findOne({ slug }).lean();

  if (!blog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });

  let nextLink = await Blog.find({ _id: { $gt: blog._id } })
    .sort({ _id: 1 })
    .limit(1);
  let previousLink = await Blog.find({ _id: { $lt: blog._id } })
    .sort({ _id: -1 })
    .limit(1);

  if (!nextLink.length) nextLink = await Blog.find().sort({ _id: 1 }).limit(1);
  if (!previousLink.length)
    previousLink = await Blog.find().sort({ _id: -1 }).limit(1);

  const relatedBlogs = omitRelated ? [] : await getRelatedBlogs(blog);

  return {
    blog: {
      ...blog,
      upvotes: blog.upvotes.length,
      downvotes: blog.downvotes.length,
      isUpvotedByUser: authId ? blog.upvotes.includes(authId) : false,
      isDownvotedByUser: authId ? blog.downvotes.includes(authId) : false,
      nextLink: `/blogs/${nextLink?.[0]?._id}`,
      previousLink: `/blogs/${previousLink?.[0]?._id}`,
    },
    relatedBlogs,
  };
};

export const updateBlogBySlug = async (
  slug: string,
  data: BlogsRouteTypes["/blogs/:slug"]["PUT"]["body"]
): Promise<BlogsRouteTypes["/blogs/:slug"]["PUT"]["response"]> => {
  const newSlug = data.title
    ? await asyncCreateSlugFromString(data.title, Blog)
    : slug;
  const updateData = {
    ...data,
    ...(data.title && { slug: newSlug }),
  };
  const oldBlog = await Blog.findOneAndUpdate({ slug }, updateData);

  if (!oldBlog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });

  const {
    content,
    banner: { url },
  } = oldBlog;

  const oldContentImages = getUploadedImagesFromHtmlInput(content);

  oldContentImages.push(url.split("/").pop() || url);

  const newContentImages = getUploadedImagesFromHtmlInput(data.content || "");

  if (data.banner)
    newContentImages.push(data.banner.url.split("/").pop() || data.banner.url);

  const imagesToPersist = newContentImages.filter(
    (image) => !oldContentImages.includes(image)
  );
  const imagesToDelete = oldContentImages.filter(
    (image) => !newContentImages.includes(image)
  );

  producer.emit.BlogUpdated({
    filesToPersist: imagesToPersist,
    filesToDelete: imagesToDelete,
  });

  return {
    slug: newSlug,
  };
};

export const deleteBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOneAndDelete({ slug });

  if (!blog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });

  const {
    content,
    banner: { url },
  } = blog;

  const oldContentImages = getUploadedImagesFromHtmlInput(content);

  oldContentImages.push(url.split("/").pop() || url);
  producer.emit.BlogDeleted({ filesToDelete: oldContentImages });
};

export const getBlogsStaticPaths = async (): Promise<
  BlogsRouteTypes["/blogs/static-paths"]["GET"]["response"]
> => (await Blog.find().select("slug").lean()).map((el) => el.slug);

export const getGrouped = async (): Promise<
  BlogsRouteTypes["/blogs/grouped"]["GET"]["response"]
> => {
  const unhydratedBlogs = (
    await Blog.aggregate<{
      recents: BlogInPaginatedResponse[];
      categories: {
        _id: string;
        items: BlogInPaginatedResponse[];
      }[];
    }>([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $addFields: {
          upvotes: { $size: "$upvotes" },
          downvotes: { $size: "$downvotes" },
        },
      },
      {
        $facet: {
          recents: [
            {
              $limit: 5,
            },
          ],
          categories: [
            {
              $skip: 5,
            },
            {
              $group: {
                _id: "$mainCategory",
                items: { $push: "$$ROOT" },
              },
            },
          ],
        },
      },
    ])
  )[0];

  const bulkCategoryNames = await getBulkCategoriesDetails(
    unhydratedBlogs.categories.map((el) => el._id)
  );

  return {
    ...unhydratedBlogs,
    categories: unhydratedBlogs.categories
      .filter((el) => bulkCategoryNames.map((c) => c._id).includes(el._id))
      .map((el) => ({
        ...el,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        category: bulkCategoryNames.find((c) => c._id === el._id)!,
      }))
      .sort((a, b) =>
        a.category.title
          .toLowerCase()
          .localeCompare(b.category.title.toLowerCase())
      ),
  };
};

export const getByCategory = async ({
  limit,
  page,
  slug,
}: BlogsRouteTypes["/blogs/by-category"]["GET"]["query"]): Promise<
  BlogsRouteTypes["/blogs/by-category"]["GET"]["response"]
> => {
  let categoryId = null;

  if (slug) ({ id: categoryId } = await getCategoryIdBySlug(slug));

  return Blog.findPaginated({
    page,
    limit,
    "sort-field": "createdAt",
    "sort-direction": SortDirection.DSC,
    match: {
      $or: [
        { mainCategory: categoryId || { $exists: true } },
        { secondaryCategories: categoryId },
      ],
    },
  });
};

export const upvoteBlog = async (slug: string, userId: string) => {
  const maybeBlog = await Blog.findOneAndUpdate(
    {
      slug,
    },
    {
      $addToSet: {
        upvotes: userId,
      },
      $pull: {
        downvotes: userId,
      },
    }
  );

  if (!maybeBlog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });
};

export const downvoteBlog = async (slug: string, userId: string) => {
  const maybeBlog = await Blog.findOneAndUpdate(
    {
      slug,
    },
    {
      $addToSet: {
        downvotes: userId,
      },
      $pull: {
        upvotes: userId,
      },
    }
  );

  if (!maybeBlog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });
};

export const clapBlog = async (slug: string) => {
  const maybeBlog = await Blog.findOneAndUpdate(
    {
      slug,
    },
    {
      $inc: {
        claps: 1,
      },
    }
  );

  if (!maybeBlog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });
};

export const removeUserVoteFromBlog = async (slug: string, authId: string) => {
  const maybeBlog = await Blog.findOneAndUpdate(
    {
      slug,
    },
    {
      $pull: {
        upvotes: authId,
        downvotes: authId,
      },
    }
  );

  if (!maybeBlog)
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });
};

const FEATURED_CATEGORIES_COUNT = 6;
const FEATURED_ITEMS_COUNT = 4;

export async function getFeaturedBlogs(): Promise<
  BlogsRouteTypes["/blogs/featured"]["GET"]["response"]
> {
  const {
    sort: { "sort-direction": sortDirection, "sort-field": sortField },
    pipeLines,
    projection,
  } = hotScoreAggregation();

  const aggregationResult = await Blog.aggregate<{
    categories: { _id: string }[];
    items: BlogInPaginatedResponse[];
  }>([
    {
      $addFields: {
        upvotes: { $size: "$upvotes" },
        downvotes: { $size: "$downvotes" },
      },
    },
    ...pipeLines,
    {
      $sort: {
        [sortField]: sortDirection === SortDirection.ASC ? 1 : -1,
      },
    },
    {
      $facet: {
        categories: [
          {
            $group: {
              _id: "$mainCategory",
              hotScore: {
                $sum: `$${sortField}`,
              },
            },
          },
          {
            $sort: {
              [sortField]: sortDirection === SortDirection.ASC ? 1 : -1,
            },
          },
          {
            $limit: FEATURED_CATEGORIES_COUNT,
          },
          {
            $project: {
              hotScore: 0,
            },
          },
        ],
        items: [
          {
            $limit: FEATURED_ITEMS_COUNT,
          },
          {
            $project: projection,
          },
        ],
      },
    },
  ]);

  if (!aggregationResult.length) {
    return {
      categories: [],
      items: [],
    };
  }
  const bulkCategoryDetails = await getBulkCategoriesDetails(
    aggregationResult[0].categories.map((el) => el._id)
  );

  return {
    categories: aggregationResult[0].categories.map(
      (el) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        bulkCategoryDetails.find((c) => c._id === el._id)!
    ),
    items: aggregationResult[0].items,
  };
}

export const getBlogScore = async (
  slug: string,
  authId?: string
): Promise<BlogsRouteTypes["/blogs/score/:slug"]["GET"]["response"]> => {
  const maybeThread = await Blog.findOne({ slug }).lean();

  if (!maybeThread) {
    throw new NotFoundError({
      message: "Blog not found",
      ressource: ACCESS_RESSOURCES.BLOGS,
    });
  }

  return {
    isUpvotedByUser: authId ? maybeThread.upvotes.includes(authId) : false,
    isDownvotedByUser: authId ? maybeThread.downvotes.includes(authId) : false,
    upvotes: maybeThread.upvotes.length,
    downvotes: maybeThread.downvotes.length,
    claps: maybeThread.claps,
  };
};
